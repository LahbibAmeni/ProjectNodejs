const mongoose=require('mongoose')

const schemauser= new mongoose.Schema({
   fullname:String,
   adresse:String,
   age:Number,
   genre:String,
   phone:Number,
   email:String,
   password:String,
   approved:{
      type: Boolean,
      default:"false"
    },
    role:{
      type:String,  
     // enum:["User" ,"Moderator"],
      default:"User"
    }
})
var User=mongoose.model('user',schemauser)

module.exports=User


