const route=require('express').Router()
const mailerModel=require('../models/mailer.model')


route.post('/sendmail',(req,res,next)=>{
 
mailerModel.send()
    .then((res)=>res.status(200).json({res}))
    .catch((err)=>res.status(400).json({error:err}))
})













module.exports=route