const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
        select:false
    },   
    refreshToken:{
        type:String,
        
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps:true
  }
)

 
const User = mongoose.model("User",userSchema);
module.exports = User