const Interview = require("../models/Interview");
const Student = require('../models/Student');


//show intervies list
module.exports.showList = async function(req,res){
    let interviews= await Interview.find({});
    let students= await Interview.find({});


    return res.render('interviews',{
        title:"Interviews",
        all_interviews:interviews,
        students:students,
    });
}

// Create interview
module.exports.createInterview = async function(req, res) {
  try {
    const { company, date, students } = req.body;
    
    const interview = await Interview.create({
      company: company,
      date: date,
      students: students,
    });

    return res.redirect("/");
  } catch (err) {
    console.log("Error in creating interview:", err);
    return res.redirect("/");
  }
};
