const mongoose=require('mongoose')

const schemaModerator= new mongoose.Schema({
   nom:String,
   prenom:String,
   adresse:String,
   age:Number,
   genre:String,
   telephone:Number,
   email:String,
   password:String,
   metier:String,
   description:String,
   approved:{
      type: Boolean,
      default:"false"
    },
   role:{
      type:String,  
       default:"Moderator"
    }

})


var Moderator=mongoose.model('moderator',schemaModerator)

module.exports=Moderator