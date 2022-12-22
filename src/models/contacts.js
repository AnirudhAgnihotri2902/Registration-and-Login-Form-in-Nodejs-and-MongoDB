const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    }
    
});
const Contact = new mongoose.model("Contact", contactSchema);
module.exports  = Contact;