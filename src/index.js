require('./models/User'); //execute user schema one time

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //parses json information
const authRoute = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

/* basic connecting */
//core of the express app itself
const app=express(); 
const port=3000;
app.use(bodyParser.json()); //use the json parser BEFORE other routers
app.use(authRoute);//make the app use the authRoute handler

//connection string to mongodb 
const mongoUri='mongodb+srv://DanielAdmin:Danespair123!@reactnativetest.zgmsx.mongodb.net/liftBud_Server?retryWrites=true&w=majority';
//connect to mongoose instance
mongoose.connect(mongoUri,{
    //options to prevent error messages
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

//connection confirmation
mongoose.connection.on('connected',()=>{
    console.log('Connected to mongodb instance')
});

//connection error message
mongoose.connection.on('error',(error)=>{
    console.error('Error connecting to mongodb',err);
})




//When the server is run, every get request gets the res, if requireAuth passes
app.get('/',requireAuth,(req,res)=>{
    res.send(`your email: ${req.user.email}`);
});

app.listen(process.env.PORT || port, ()=>{
    console.log(`listening on port ${port}`);
});

