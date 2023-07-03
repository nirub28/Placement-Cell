const express= require('express');
const app=express();
const port=8000;

app.listen(port, function(err){
    if(err){
        console.log(`The error in runng server ${err}`);
    }
    console.log(`The server is running on port: ${port}`);
})