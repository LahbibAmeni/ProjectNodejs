const route=require('express').Router()
const userController=require('../controller/user.controller')
const isAdmin=require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');
 require('dotenv').config()
var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();

secretkey=process.env.SECRET_KEY
clientkey=process.env.CLIENT_KEY

verifysecretclient=(req,res,next)=>{
    let sk = req.params.secret
    let ck = req.params.client
     if((sk==secretkey)&&(ck==clientkey)){
       next()
    }else{
      return  res.status(400).json({error:"you can't access to this route please send me secretkey and clientkey!!"})
    }       
}

route.post('/register',(req,res,next)=>{
userController.register(req.body.fullname,req.body.adresse,req.body.age,req.body.genre,req.body.phone,req.body.email,req.body.password,req.body.approved,req.body.role)
    .then((user)=>res.status(200).json({user:user,msg:"added !"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.post('/login',(req,res,next)=>{
userController.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/users/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
    userController.getalluser()
    .then((doc)=>res.status(200).json({users:doc}))
    .catch((err)=>res.status(400).json(err))
})


route.post('/addUser/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
userController.addUser(req.body.fullname,req.body.adresse,req.body.age,req.body.genre,req.body.phone,req.body.email,req.body.password,req.body.approved,req.body.role)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/getOneUser/:id/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
    userController.getOneUser(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/deleteUser/:id/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
  userController.deleteOneUser(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.put('/updateUser/:id',(req,res,next)=>{
    userController.updateOneUser(req.params.id,req.body.fullname,req.body.adresse,req.body.age,req.body.genre,req.body.phone,req.body.email,req.body.password,req.body.approved,req.body.role)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})






 module.exports=route