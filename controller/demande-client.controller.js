const mongoose=require('mongoose')
const Service=require('../models/demande-client.model')
const Joi = require('joi').extend(require('@joi/date'));
require('dotenv').config()
var url=process.env.URL

const SchemaValidation = Joi.object({

   nom:Joi.string().alphanum().min(2).max(20).required(),
   prenom:Joi.string().alphanum().min(2).max(20).required(),
   adresse:Joi.string().alphanum().min(2).max(20).required(),
   age:Joi.number().required(),
   genre:Joi.string().valid('homme', 'femme').required(),
   telephone:Joi.number().required(),
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   date:Joi.date().format('YYYY-MM-DD ss:mm:hh').utc().raw().required(),
   durée:Joi.string().min(1).max(20).required(),
   service:Joi.string().trim().allow("").min(2).max(20).required()
 
})

exports.addService=(nom,prenom,adresse,age,genre,telephone,email,date,durée,service)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
           
            let validation = await SchemaValidation.validateAsync({nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,telephone:telephone,email:email,date:date,durée:durée,service:service})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message())
            }
             let clientS= new Service({
                nom:nom,
                prenom:prenom,
                adresse:adresse,
                age:age,
                genre:genre,
                telephone:telephone,
                email:email,
                date:date,
                durée:durée,
                service:service
                 })
          clientS.save().then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }).catch((err)=>reject(err))
    })
}

exports.getallServices=()=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Service.find()

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.getOneService=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Service.findById(id)

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.deleteOneService=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Service.deleteOne({id:id})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.updateOneSevice=(id,nom,prenom,adresse,age,genre,telephone,email,date,durée,service)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
              let validation = await SchemaValidation.validateAsync({nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,telephone:telephone,email:email,date:date,durée:durée,service:service})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
        return Service.updateOne({_id:id},{nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,telephone:telephone,email:email,date:date,durée:durée,service:service})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}