const mongoose=require('mongoose')
const usermodel= require('../models/user.model')
var _id = mongoose.Types.ObjectId();
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken')
const Joi = require('joi')
require('dotenv').config()
var privatekey=process.env.PRIVATE_KEY
var url=process.env.URL

const SchemaValidation = Joi.object({

   fullname:Joi.string().allow("").min(2).max(20).required(),
   adresse:Joi.string().allow("").alphanum().min(2).max(20).required(),
   age:Joi.number().required(),
   genre:Joi.string().valid('homme','femme').required(),
   phone:Joi.number().required(),
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   password:Joi.string().alphanum().min(2).max(20).required(),
   approved:Joi.string().min(2).max(20),
   role:Joi.string().min(2).max(20).required()
})
const Validation = Joi.object({
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   password:Joi.string().alphanum().min(2).max(20).required(), 
})


exports.register=(fullname,adresse,age,genre,phone,email,password,approved,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let validation= SchemaValidation.validate({fullname:fullname,adresse:adresse,age:age,genre:genre,
                phone:phone,email:email,password:password,approved:approved,role:role})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
                
           return usermodel.findOne({email:email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this email is exist')
            }else{
                bcrypt.hash(password,10).then((hashpassword)=>{
                    let user = new usermodel({
                    fullname:fullname,
                    adresse:adresse,
                    age:age,
                    genre:genre,
                    phone:phone,
                    email:email,
                    password:hashpassword,
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


exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             let validation= Validation.validate({email:email,password:password})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
           return usermodel.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject("Invalid email and password")
            }else{
                bcrypt.compare(password,user.password).then((same)=>{
                    
                 if(same){
                     let token=jwt.sign({id:user.id, fullname:user.fullnamea,dresse:user.adresse,age:user.age,genre:user,email:user.email},privatekey,{
                         expiresIn:'2h',
                     })
                       mongoose.disconnect()
                      resolve(token)
                 }else{
                       mongoose.disconnect()
                      reject('Invalid email and password')
                 }   

                }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })
            }
        })
    })
}

exports.getalluser=()=>{
   return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return usermodel.find()

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.getOneUser=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return usermodel.findById(id)

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}
exports.addUser=(fullname,adresse,age,genre,phone,email,password,approved,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             let validation= SchemaValidation.validate({fullname:fullname,adresse:adresse,age:age,genre:genre,
                phone:phone,email:email,password:password,approved:approved,role:role})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
                    let user = new usermodel({
                    fullname:fullname,
                    adresse:adresse,
                    age:age,
                    genre:genre,
                    phone:phone,
                    email:email,
                    password:password,
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
    

exports.deleteOneUser=(id)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        return usermodel.deleteOne({_id:id})

         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
             reject(err)
            })
        }) 
}

exports.updateOneUser=(id,fullname,adresse,age,genre,phone,email,password,approved,role)=>{
     return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(async()=>{
         let validation = await SchemaValidation.validateAsync({fullname:fullname,adresse:adresse,age:age,genre:genre,phone:phone,email:email,password:password,approved:approved,role:role})
            if(validation.error){
                mongoose.disconnect()
                reject(validation.error.details[0].message)
            }
       
        return usermodel.updateOne({_id:id},{fullname:fullname,adresse:adresse,age:age,genre:genre,phone:phone,email:email,password:password,approved:approved,role:role})
        
         }).then((doc)=>{
              mongoose.disconnect()
              resolve(doc)
         }).catch((err)=>{
            mongoose.disconnect()
             reject(err)
            })
        }) 
}