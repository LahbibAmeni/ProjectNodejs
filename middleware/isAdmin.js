var jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
 require('dotenv').config()
var privatekey=process.env.PRIVATE_KEY

module.exports = function(req,res,next){
   
     const  token = req.header('Authorization') 
      const  role = req.header('role')
     const Role=jwt_decode(token).role
   if(!token || role!='Admin'|| Role!='Admin'){
       return  res.status(401).json({msg:'You are not Admin'})
     }
     try{
         jwt.verify(token,privatekey)
        next()
     }
     catch(e){
        res.status(400).json({msg:e})
     }
   
}
