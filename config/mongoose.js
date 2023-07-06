const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/placement_development');

const db=mongoose.connection;

db.on('error', console.error.bind('Error connecting to MongoDB'));

db.once('open' , function(){
    console.log('Conneted to Database:: MongoDB');
})

module.exports=db;
