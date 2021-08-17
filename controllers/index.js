const axios = require("axios");
const Message = require("../models/message");


exports.getHomepage =  (req, res) => {
res.render('index')
};

exports.contactHandler = async (req,res) => {
  const {first_name,last_name,email,message} = req.body;
let errors = [];

if(!first_name || !last_name || !email || !message){
  errors.push({"msg":  "Please fill in the required fields"})
}
if(errors.length > 0){
  res.render('index', {errors,first_name,last_name,email,message})
}
await new Message({errors,first_name,last_name,email,message}).save()
              req.flash("success_msg" , `Message Sent Successfully! 👍👍`)
              res.redirect("/")
}
