const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

//function() happens before saving any User
userSchema.pre('save',function(next){
    const user = this;
    //make sure the user isn't just initialized
    if (!user.isModified('password')){
        return next();
    }

    //generate salt and hash the password then store it
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err);

        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//password checking method
userSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve,reject)=>{

        //use bcrypt to check whether hashed and salted password is correct
        bcrypt.compare(candidatePassword, user.password, (err,isMatch)=>{
            if (err){
                return reject (err);
            };
            if (!isMatch) {
                return reject (false);
            };
            resolve(true)
        });

    });
}

mongoose.model('User',userSchema);