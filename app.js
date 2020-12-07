const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
var app = express();
const MONGODB_URI='mongodb+srv://abdelrhman:01210901232@cluster0.g5ppb.mongodb.net/messages?retryWrites=true&w=majority';

//var fs = require("fs");
app.use(express.json({extended:false}));
app.use('/', authRoutes);

// app.post('/signup',(req, res)=>{
//    const {email, password} =req.body;
//    console.log(email);
//  //  return res.send('api signup');
// })

var server = app.listen(8080, function () {
   mongoose.connect(MONGODB_URI);
})

// mongoose.connect(MONGODB_URI)
// .then(result => {
//     const server = app.listen(8080);
//     // const io = require('./socket').init(server);

//     // io.on('connection', socket => {
//     //   console.log('Client connected');
//     // });

//   })
//   .catch(err =>{
//     console.log(err);
//     console.log('ddddd');
//   });

 