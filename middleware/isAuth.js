var jwt = require('jsonwebtoken')
 require('dotenv').config()
var privatekey=process.env.PRIVATE_KEY

module.exports=function(req,res,next){
   const  token = req.header('Authorization') 
   if(!token){
         res.status(401).json({msg:'access rejected .....!!!!'})
          next()
     }
     try{
         jwt.verify(token,privatekey)
        next()
     }
     catch(e){
        res.status(400).json({msg:e})
     }
}


