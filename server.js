const express= require('express')
var cors = require('cors')
const JobRoute=require('./routers/job.route')
const userRoute=require('./routers/user.route')
const adminRoute=require('./routers/admin.route')
const clientRoute=require('./routers/demande-client.route')
const moderatorRoute=require('./routers/moderator.route')
const emailRoute=require('./routers/email.route')
const app=express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin',"*") ;
    res.header("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', "GET,HEAD,PUT,PATCH,POST,DELETE,OPTION");
    res.header('Access-Control-Allow-Methods',"*");
    res.setHeader('Access-Control-Request-Methods',"*");
    res.header('Access-Control-Request-Headers',"*");
    res.header('Access-Control-Allow-Credentials:true');
    res.header("access-control-expose-headers", "Authorization");
    res.header('Access-Control--Request-Method',"*");
   
    
    next()
})
app.use('/',JobRoute)
app.use('/user/',userRoute)
app.use('/admin',cors(),adminRoute)
app.use('/',clientRoute)
app.use('/moderator',moderatorRoute)


app.use('/',emailRoute)








app.listen(3000,()=>console.log("server run in port 3000"))