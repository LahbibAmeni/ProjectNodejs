const route=require('express').Router()
const JobController=require('../controller/job.controller')
 require('dotenv').config()
const isauth=require('../middleware/isAuth')
const isAdmin=require('../middleware/isAdmin')


secretkey=process.env.SECRET_KEY
clientkey=process.env.CLIENT_KEY


verifysecretclient=(req,res,next)=>{
    let sk = req.params.secret
    let ck = req.params.client
     if((sk==secretkey)&&(ck==clientkey)){
     next()
    }else{
        res.status(400).json({error:"you can't access to this route please send me secretkey and clientkey!!"})
    }       
}

route.post('/addjob/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
    JobController.addcategorie(req.body.name)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.get('/getjobs/:secret/:client',verifysecretclient,isauth,(req,res,next)=>{  
    JobController.getallcategorie()
    .then((doc)=>res.status(200).json({jobs:doc}))
    .catch((err)=>res.status(400).json(err)) 
})

route.get('/getonejob/:id/:secret/:client',verifysecretclient,isauth,(req,res,next)=>{
    JobController.getOnecategorie(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.delete('/deletejob/:id/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
    JobController.deleteOnecategorie(req.params.id)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})

route.put('/updatejob/:id/:secret/:client',verifysecretclient,isAdmin,(req,res,next)=>{
    JobController.updateOnecategorie(req.params.id,req.body.name)
    .then((doc)=>res.status(200).json(doc))
    .catch((err)=>res.status(400).json(err))
})






module.exports=route