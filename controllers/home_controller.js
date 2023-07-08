const Student = require('../models/Student');

module.exports.home=async function(req,res){


    let students= await Student.find({});

    return res.render('home',{
        title:"Home",
        all_students:students,
    });
};