const route=require('express').Router()
const ClientContr=require('../controller/demande-client.controller')
 require('dotenv').config()
const isauth=require('../middleware/isAuth')
const isAdmin=require('../middleware/isAdmin')

 //var privatekey=process.env.PRIVATE_KEY
// secretkey=process.env.SECRET_KEY
// clientkey=process.env.CLIENT_KEY

route.post('/addservice',isAdmin,(req,res,next)=>{
    ClientContr.addService(req.body.nom,req.body.prenom,req.body.adresse,req.body.age,req.body.genre,req.body.telephone,req.body.email,req.body.date,req.body.durée,req.body.service)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.get('/services',isauth,(req,res,next)=>{  
    ClientContr.getallServices()
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err)) 
})

route.get('/getoneService/:id',isauth,(req,res,next)=>{
    ClientContr.getOneService(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/deleteService/:id',isAdmin,(req,res,next)=>{
 ClientContr.deleteOneService(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.put('/updateService/:id',isAdmin,(req,res,next)=>{
    ClientContr.updateOneSevice(req.params.id,req.body.nom,req.body.prenom,req.body.adresse,req.body.age,req.body.genre,req.body.telephone,req.body.email,req.body.date,req.body.durée,req.body.service)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})






module.exports=route