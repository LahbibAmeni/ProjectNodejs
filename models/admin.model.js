const mongoose=require('mongoose')

const schemaAdmin= new mongoose.Schema({
   fullname:String,
   email:String,
   password:String,
   role:{
    type:String,
    enum:['Regular',"Admin"],
    default:"Admin"
   }

})

const Admin=mongoose.model('admin',schemaAdmin)



module.exports=Admin

