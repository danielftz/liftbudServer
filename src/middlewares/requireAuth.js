//checks jwt, then decide accept or reject;

const jwt=require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next)=>{
    //call next to move onto chain of middleware
    //or end o request handler
    
    //check request Authorization Bearer
    const {authorization} = req.headers;

    //if no authorization header, give error message
    if (!authorization) {
        return res.status(401).send({error:'You must be logged in! '});
    };

    //extract token 
    const token=authorization.replace ('Bearer ','');

    //verify token
    jwt.verify(token, 'dfang_secret_key', async(err, payload)=>{
        //if token is not verified, return error message
        if (err){
            return res.status(401).send({error:'You must be logged in! '});
        }
        //console.log(payload)

        //if token verified, locate user within the payload
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });


}