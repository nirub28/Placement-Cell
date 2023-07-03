const express= require('express');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');

app.use(express.static('./assets')); // to use asset folders

//use layouts, should be before routes
app.use(expressLayouts);

// take all css/script files in subpages and put it in layout header, else it will in body tag
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


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