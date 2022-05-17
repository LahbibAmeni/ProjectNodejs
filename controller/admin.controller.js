const mongoose=require('mongoose')
const adminmodel= require('../models/admin.model')
const bcrypt=require('bcrypt')
var jwt = require('jsonwebtoken')
const Joi = require('joi')
 require('dotenv').config()

var privatekey=process.env.PRIVATE_KEY
var url=process.env.URL

const SchemaValidation = Joi.object({
   fullname:Joi.string().allow("").min(2).max(20).required(),
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   password:Joi.string().alphanum().min(2).max(20).required(),
    role:Joi.string().min(2).max(20).required()
})
const Validation = Joi.object({
   email:Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).required(),
   password:Joi.string().alphanum().min(2).max(20).required(), 
})



exports.registerAdmin=(fullname,email,password,role)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             let validation= SchemaValidation.validate({fullname:fullname,email:email,password:password,role})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
           return adminmodel.findOne({email:email})
        }).then((doc)=>{
            if(doc){
                mongoose.disconnect()
                reject('this email is exist')
            }else{
                bcrypt.hash(password,10).then((hashpassword)=>{
                    let admin = new adminmodel({
                    fullname:fullname,
                    email:email,
                    password:hashpassword,
                    role:role
                    })

                   admin.save().then((admin)=>{
                         mongoose.disconnect()
                         resolve(admin)
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


exports.loginAdmin=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
             let validation= Validation.validate({email:email,password:password})
                if(validation.error){
                     mongoose.disconnect()
                      reject(validation)
                }
           return adminmodel.findOne({email:email})
        }).then((admin)=>{
            if(!admin){
                mongoose.disconnect()
                reject("invalid email and password")
            }else{
                bcrypt.compare(password,admin.password).then((same)=>{
                    
             if(same){
                let token=jwt.sign({id:admin.id,fullname:admin.fullname,email:admin.email,role:'Admin'},privatekey,{
                         expiresIn:'365d',
                     })
                    mongoose.disconnect()
                    resolve({token:token,role:'Admin'})
             }else{
                    mongoose.disconnect()
                    reject('invalid email and password')
                 }   

                }).catch((err)=>{
                    mongoose.disconnect()
                      reject(err)
                     })
            }
        })
    })
}