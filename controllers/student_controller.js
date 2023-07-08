const Student = require("../models/Student");

//student profile
module.exports.profile = async function(req, res) {
  try {
    const student = await Student.findById(req.params.id);
    return res.render('student_profile', {
      title: "Student Profile",
      profile_student: student
    });
  } catch (err) { 
    console.log('Error in finding student:', err);
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
