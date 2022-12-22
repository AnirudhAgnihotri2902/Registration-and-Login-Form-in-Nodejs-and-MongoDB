const express = require("express");
const app = express();
const path =  require("path");
const hbs = require("hbs");
require("./db/conn"); 
const Register = require("./models/registers");
const Contact = require("./models/contacts");
const { json } = require("express");
const bcrypt =require('bcryptjs');
const jwt = require("jsonwebtoken");
const PORT  = process.env.PORT ||  3000;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine", "hbs"); 
const middleware  = (req, res, next)=>{
  res.send(`Action Prohibited`);
  //next();
}
app.get("/", (req, res) =>{
    res.render("register");
});
app.get("/register", (req, res)=>{
    res.render("register");
});
app.get("/signin" ,(req, res)=>{
  res.render("register");
});
app.get("/contact", (req, res)=>{
  res.render("contact");
});
app.post("/register", async(req, res)=>{
    try{ 
      const password = req.body.password;
      const cpassword = req.body.password;
      const useremailll = await Register.findOne({email:req.body.email});
      if(useremailll){
        res.send("Email Already Exists!!");
      }
      if(password === cpassword){
        const registerEmployee = new Register({
          name : req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          linkedin: req.body.linkedin,
          password: req.body.password

        })
        const token = await registerEmployee.generateAuthToken();
        const registered =  await registerEmployee.save();
        res.status(201).render("index", {user: registerEmployee});
      }else{
        res.send("paswords are not matching")
      }
    }
    catch(error){
      res.status(400).send(error);
    }
})

app.post("/signin", async(req, res)=>{
    try{
        const email = req.body.email;
        const password =  req.body.password;
        // console.log(`${email} and password ${password}`);
        const useremail = await Register.findOne({email:email});
        if(useremail == null)res.send("Email not found");
        const isMatch = await bcrypt.compare(req.body.password, useremail.password);
        const token = await useremail.generateAuthToken();
        // console.log(isMatch); 
        if(isMatch == true){
          res.status(201).render("index", {user: useremail});
        }
        else{
          res.send("password are not matching");
        }
    } catch(error){
        res.status(400).send(error);
    }
});

app.post("/contact", async(req, res)=>{
  try{
        const contacted = new Contact({
          name : req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          linkedin: req.body.linkedin
        })
        console.log(contacted);
        const registered =  await contacted.save();
        res.status(201).render("index",{name: req.body.name});
  }
  catch(error){
    res.status(400).send(error);
  }
})

app.listen(PORT, ()=> {
  console.log(`server running at port no ${PORT}`);
}); 