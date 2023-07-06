const express= require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
const cookieParser = require('cookie-parser');


//authen
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stratergy');
const  MongoStore = require('connect-mongo'); // to store session data in mongodb



app.use(express.static('./assets')); // to use asset folders

//use layouts, should be before routes
app.use(expressLayouts);

// take all css/script files in subpages and put it in layout header, else it will in body tag
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//middleware to parse the request body
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

//create session 
app.use(session({
    name:'cdnPlacement',
    secret:'E1EQr55QqbYbyyTJEboFzVRfRMngtf0E',
    saveUninitialized:false,
    resave:false,
    cookie:{
       maxAge:(1000*60*100)
    },
 
      store : new MongoStore({
       mongoUrl : "mongodb://127.0.0.1:27017/placement_development",
       autoremove : "disabled",
   },function(err){
       console.log("error at mongo store",err || "connection established to store cookie");
   })
 }));


//authen
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.SetAuthenticatedUser);


//use express routes
app.use('/', require('./routes'));

//set view engine
app.set('view engine','ejs');
app.set('views', './views');


app.listen(port, function(err){
    if(err){
        console.log(`The error in runng server ${err}`);
    }
    console.log(`The server is running on port: ${port}`);
})