const mongoose = require('mongoose');

//telling mongoose the properties included in every obj of "users"
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

});

mongoose.model('User',userSchema);