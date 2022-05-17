
const mongoose=require('mongoose')


const schemaclient=new mongoose.Schema({
   nom:String,
   prenom:String,
   adresse:String,
   age:Number,
   genre:String,
   telephone:Number,
   email:String,
   date:Date,
   durée:String,
   service:String
})


var Service=mongoose.model('demande_service',schemaclient)

module.exports=Service
