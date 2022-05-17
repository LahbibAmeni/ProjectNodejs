const route=require('express').Router()
const admincontroller=require('../controller/admin.controller')

 require('dotenv').config()


route.post('/register',(req,res,next)=>{
admincontroller.registerAdmin(req.body.fullname,req.body.email,req.body.password,req.body.role)
    .then((admin)=>res.status(200).json({admin:admin,msg:"added !"}))
    .catch((err)=>res.status(400).json({error:err}))
})
route.post('/login',(req,res,next)=>{
admincontroller.loginAdmin(req.body.email,req.body.password)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json({error:err}))
})



module.exports=route