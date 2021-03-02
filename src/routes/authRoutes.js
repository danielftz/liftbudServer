const express = require('express');
const mongoose=require('mongoose');
const User=mongoose.model('User');

//create a router to associate route handlers with it
const router = express.Router();

//this router will handle post request with '/signup'
router.post('/signup',(req,res)=>{
    console.log(req.body);
    
    res.send('you made a post request');
});

module.exports=router;