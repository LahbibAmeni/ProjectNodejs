const mongoose= require('mongoose')

const schemamodel= new mongoose.Schema({
    name:String
})

var Job=mongoose.model('categorie',schemamodel)

module.exports=Job