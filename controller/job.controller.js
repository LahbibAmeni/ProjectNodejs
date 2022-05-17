const mongoose= require('mongoose')
const userModel=require('../models/job.model')
const Joi = require('joi')
 require('dotenv').config()
var url=process.env.URL

const SchemaValidation = Joi.object({
   name: Joi.string().alphanum().allow(" ").min(2).max(20).required()
})


exports.addcategorie=(name)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
           
            let validation = await SchemaValidation.validateAsync({name:name})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
             let categorie= new userModel({
                name:name
                 })
          categorie.save().then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getallcategorie=()=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return userModel.find()

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.getOnecategorie=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return userModel.findById(id)

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.deleteOnecategorie=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return userModel.deleteOne({id:id})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.updateOnecategorie=(id,name)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
              let validation = await SchemaValidation.validateAsync({name:name})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
        return userModel.updateOne({id:id},{name:name})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}