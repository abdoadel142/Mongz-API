const {validationResult} = require('express-validator/check');
const User =require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
exports.signup=(req,res,next)=>{
      const errors= validationResult(req);
if (!errors.isEmpty()){
    const error = new Error('validation Failed');
        error.statusCode= 422;
        error.data= errors.array();
        throw error;
}
const email = req.body.email;
const name=req.body.name;
const password = req.body.password;
console.log(email);
bcrypt.hash(password,12)
.then(hashedPw=>{
    const user =new User({
        email:email,
        password:hashedPw,
        name:name
    });
   return user.save();
   
}).then(result=>{
res.status(200).json({message: 'User created', userId:result._id}); 
console.log('bbbbbbbbbbbbb');     
})
.catch(err=>{
    if(!err.statusCode){
        err.statusCode = 500;
    }
 next(err);        
});

};
exports.login=(req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
console.log(email);
console.log("email");

console.log(password);

    let loadedUser;
    User.findOne({email:email})
    .then(user=>{
        if(!user){
const error =new Error('A user this email could not be found');
error.statusCode=401;
throw error;
        }
        loadedUser=user;
        return bcrypt.compare(password,user.password);
    })
    .then(isEqual=>{
        if(!isEqual){
            const error =new Error('wrong password');
            error.statusCode=401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: email,
                userId: loadedUser._id.toString()              
            },
            'secret',
            { expiresIn: '1h'}
            );
            res.status(200).json({token:token, userId:loadedUser._id.toString()});
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode = 500;
        }
     next(err);        
    });

}