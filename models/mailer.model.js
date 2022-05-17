var nodemailer = require('nodemailer');
//const mongoose=require('mongoose')
//var usermodel=require('./user.model');
//const userContr=require('../controller/user.controller')

require('dotenv').config()


exports.send=()=>{

//let User =userContr.getOneUser(id)
// create transporter object with smtp server details
var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,               // true for 465, false for other ports
  host: "smtp.gmail.com",
  auth: {
    user:  'maria@gmail.com',
    pass: 'maria123'
  }
});

var mailOptions = {
  from: 'maria@gmail.com',
  to:'lahbibameni36@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

