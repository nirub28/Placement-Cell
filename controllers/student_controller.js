const Student = require("../models/Student");
const Interview = require('../models/Interview');


//student profile
module.exports.profile = async function(req, res) {
  try {
    const student = await Student.findById(req.params.id).populate('interviews.interview');
      if (student) {
        const interviews = await Promise.all(student.interviews.map(async interview => {
          const interviewData = await Interview.findById(interview.interview);
          const result = interviewData ? interview.result : 'N/A'; // Extract the result if interviewData exists, otherwise set as 'N/A'
  
          return {
            ...interviewData.toObject(),
            result: result
          };
        }));


      return res.render('student_profile', {
        title: "Student Profile",
        profile_student: student,
        interviews: interviews
      });
    } else {
      return res.status(404).send("Student not found");
    }
  } catch (err) { 
    console.log('Error in finding student:', err);
    return res.status(500).send("Internal Server Error");
  }
};



module.exports.add = async function (req, res) {
  try {
    const existingStudent = await Student.findOne({
      email: req.body.email,
    });

    if (!existingStudent) {
      const newStudent = await Student.create(req.body);
      return res.redirect("/");
    } else {
      console.log("user with ID already available");
      return res.redirect("/");
    }
  } catch (err) {
    console.log("Error finding student:", err);
  }
};

module.exports.delete = async function(req, res) {
  try {   
    await Student.deleteOne({ _id: req.params.id });
    return res.redirect('/');
  } catch (err) { 
    console.log('Error in deleting student:', err);
    return res.redirect('/');
  }
};
