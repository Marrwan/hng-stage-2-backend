var mongoose = require("mongoose");




const messageSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
     type: String,
      
    },
email : {
    type: String
},
  message: {
    type: String,
  }
});

module.exports = mongoose.model("Message", messageSchema);
