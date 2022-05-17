const mongoose=require('mongoose')
const Moderator=require('../models/moderator.model')
var _id = mongoose.Types.ObjectId();
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken')
const Joi = require('joi')
require('dotenv').config()
var url=process.env.URL

const SchemaValidation = Joi.object({

   nom:Joi.string().min(2).max(20).required(),
   prenom:Joi.string().min(2).max(20).required(),
   adresse:Joi.string().allow("").min(2).max(20).required(),
   age:Joi.number().required(),
   genre:Joi.string().valid('homme', 'femme').required(),
   telephone:Joi.number().required(),
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   password:Joi.string().alphanum().min(2).max(20).required(),
   metier:Joi.string().allow("").min(2).max(20).required(),
   description:Joi.string().allow("").min(2).max(40).required(),
   approved:Joi.string().valid('true', 'false').min(2).max(20),
   role:Joi.string().valid('Moderator').min(2).max(20)
 
})

exports.register=(nom,prenom,adresse,age,genre,telephone,email,password,metier,description,approved,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
 let validation= SchemaValidation.validate({nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,
                telephone:telephone,email:email,password:password,metier:metier,description:description,approved:approved,role:role})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
           return Moderator.findOne({email:email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this email is exist')
            }else{
                bcrypt.hash(password,10).then((hashpassword)=>{
                    let user = new Moderator({
                    nom:nom,
                    prenom:prenom,
                    adresse:adresse,
                    age:age,
                    genre:genre,
                    telephone:telephone,
                    email:email,
                    password:hashpassword,
                    metier:metier,
                    description:description,
                    approved:approved,
                    role:role

                    })

                   user.save().then((user)=>{
                         mongoose.disconnect()
                         resolve(user)
                    }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })

                }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })
            }
        })
    })
}

var privatekey=process.env.PRIVATE_KEY

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
           return Moderator.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject("we don't have this email in our data base")
            }else{
                bcrypt.compare(password,user.password).then((same)=>{
                    
                 if(same){
                     let token=jwt.sign({id:user.id, nom:user.nom,prenom:user.prenom},privatekey,{
                         expiresIn:'2h',
                     })
                       mongoose.disconnect()
                      resolve(token)
                 }else{
                       mongoose.disconnect()
                      reject('invalid password')
                 }   

                }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })
            }
        })
    })
}

exports.getallmoderator=()=>{
   return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Moderator.find()

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.getOnemoderator=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Moderator.findById(id)

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}
exports.addmoderator=(nom,prenom,adresse,age,genre,telephone,email,password,metier,description,approved,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             let validation= SchemaValidation.validate({nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,
                telephone:telephone,email:email,password:password,metier:metier,description:description,approved:approved,role:role})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
                    let user = new Moderator({
                    nom:nom,
                    prenom:prenom,
                    adresse:adresse,
                    age:age,
                    genre:genre,
                    telephone:telephone,
                    email:email,
                    password:password,
                    metier:metier,
                    description:description,
                    approved:approved,
                    role:role

                    })
                   user.save().then((doc)=>{
                         mongoose.disconnect()
                         resolve(doc)
                    }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })

                }).catch((err)=>reject(err))        
            })
        }
    

exports.deleteOnemoderator=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return Moderator.deleteOne({_id:id})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.updateOneModerator=(id,nom,prenom,adresse,age,genre,telephone,email,password,metier,description,approved,role)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
         let validation = await SchemaValidation.validateAsync({nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,telephone:telephone,email:email,password:password,metier:metier,description:description,approved:approved,role:role})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
        return Moderator.updateOne({_id:id},{nom:nom,prenom:prenom,adresse:adresse,age:age,genre:genre,telephone:telephone,email:email,password:password,metier:metier,description:description,approved:approved,role:role})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}