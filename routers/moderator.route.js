const route=require('express').Router()
const moderatorContr=require('../controller/moderator.controller')
const isAdmin=require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');

route.post('/register',(req,res,next)=>{
moderatorContr.register(req.body.nom,req.body.prenom,req.body.adresse,req.body.age,req.body.genre,req.body.telephone,req.body.email,req.body.password,req.body.metier,req.body.description,req.body.approved,req.body.role)
    .then((user)=>res.status(200).json({user,msg:"added !"}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.post('/login',(req,res,next)=>{
moderatorContr.login(req.body.email,req.body.password)
    .then((token)=>res.status(200).json({token:token}))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/moderators',isAdmin,(req,res,next)=>{
    moderatorContr.getallmoderator()
    .then((doc)=>res.status(200).json({moderators:doc}))
    .catch((err)=>res.status(400).json(err))
})


route.post('/addModerator',isAdmin,(req,res,next)=>{
moderatorContr.addmoderator(req.body.nom,req.body.prenom,req.body.adresse,req.body.age,req.body.genre,req.body.telephone,req.body.email,req.body.password,req.body.metier,req.body.description,req.body.approved,req.body.role)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json({error:err}))
})

route.get('/getOneModerator/:id',isAuth,(req,res,next)=>{
    moderatorContr.getOnemoderator(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/deleteModerator/:id',isAdmin,(req,res,next)=>{
  moderatorContr.deleteOnemoderator(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.put('/updateModerator/:id',isAdmin,(req,res,next)=>{
   moderatorContr.updateOneModerator(req.params.id,req.body.nom,req.body.prenom,req.body.adresse,req.body.age,req.body.genre,req.body.telephone,req.body.email,req.body.password,req.body.metier,req.body.description,req.body.approved,req.body.role)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})






 module.exports=route