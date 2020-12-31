const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
//  const MONGODB_URI='mongodb+srv://abdelrhman:01210901232@cluster0.g5ppb.mongodb.net/messages?retryWrites=true&w=majority';

const MONGODB_URI = 'mongodb+srv://roaa:B2OwcHtSyUojMla0@cluster0.aszcs.mongodb.net/messages?retryWrites=true&w=majority';
// const MONGODB_URI = 'mongodb+srv://mongz2020:masr2020@cluster0.kljj7.mongodb.net/mongzDB?retryWrites=true&w=majority'
const PORT = process.env.port || 8080;

const app = express();


app.use(express.json({extended:false}));



app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   next();
});

//app.use('/', authRoutes);
app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);
app.use('/admin',adminRoutes);

// Error heandling function
app.use((error, req, res, next) => {
   console.log(error);
   const status = error.statusCode || 500;
   const message = error.message;
   const data = error.data;
   res.status(status).json({ message: message, data: data });
});


mongoose.connect(MONGODB_URI)
.then(result => {
    const server = app.listen(PORT);
    console.log("sssss");
    // const io = require('./socket').init(server);

    // io.on('connection', socket => {
    //   console.log('Client connected');
    // });

  })
  .catch(err =>{
    console.log(err);
  });

 