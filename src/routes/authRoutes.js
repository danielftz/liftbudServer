const express = require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');//json webtoken 
const User=mongoose.model('User');

//create a router to associate route handlers with it
const router = express.Router();

//this router will handle post request with '/signup'
router.post('/signup',async(req,res)=>{
    console.log(req.body);
    //extract email and password from the request body
    const {email,password} = req.body;
    const user = new User({email,password});
    await user.save();

    //generate token that is included in any request
    //this token can be unpacked into {userId:####, iat:####}
    const token = jwt.sign({userId:user._id},'dfang_secret_key')
    res.send({token:token});
});

//this router will handle post request wiht '/signon'
router.post('/signon', async(req,res)=>{
    const {email, password} = req.body;
    
    //if email or password empty
    /*future goal: add email and password validation */
    if (!email || !password) {
        return res.status(422).send({msg: 'Must provide email and password',email,password});
    };

    const user = await User.findOne({email});
    //if user already exists
    //prompt user to register in liftbudJS
    if (!user){
        return res.status(404).send({msg: 'User does not exist',email,password});
    }

    //log in
    try{
        //compare password see if it is correct
        await user.comparePassword(password);
        //return json token if password is correct
        const token = jwt.sign({userId:user._id},'dfang_secret_key')
        res.send({token});
    } catch (err){
        return res.status(422).send({msg:'Invalid password or email',email,password});
    }

})

module.exports=router;