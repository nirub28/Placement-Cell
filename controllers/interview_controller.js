const Interview = require("../models/Interview");
const Student = require('../models/Student');


//show intervies list
module.exports.showList = async function(req,res){
    let interviews= await Interview.find({});
    let students= await Student.find({});


    return res.render('interviews',{
        title:"Interviews",
        all_interviews:interviews,
        all_students:students,
    });
}

// to show interview detail
module.exports.interviewDetail =async function(req,res){
  try {
    const interview = await Interview.findById(req.params.id).populate("students", "name email"); // to get students details
    return res.render("interview_detail", {
      title: "Interview",
      interview: interview,
    });
  } catch (err) {
    console.log("Error in fetching interview details:", err);
    return res.redirect("/");
  }

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

    for (const studentId of students) {
      const student = await Student.findById(studentId);
      if (student) {
        student.interviews.push({ interview: interview._id });
        await student.save();
      }
    }

    return res.redirect("/");
  } catch (err) {
    console.log("Error in creating interview:", err);
    return res.redirect("/");
  }
};


// Update interview results
module.exports.updateResults = async function(req, res) {
  try {
    const { interviewId } = req.body;
    const results = req.body; // Access the entire req.body object


    // Iterate over the results object
    for (const key in results) {
      if (key.startsWith('result-')) {
        const studentId = key.replace('result-', '');
        const result = results[key];

        // Find the student and update the interview result
        const student = await Student.findById(studentId);
        if (student) {
          const interviewIndex = student.interviews.findIndex(
            (interview) => interview.interview.toString() === interviewId
          );
          if (interviewIndex !== -1) {
            student.interviews[interviewIndex].result = result;
            await student.save();
          }
        }
      }
    }

    return res.redirect("/interviews/list");
  } catch (err) {
    console.log("Error in updating interview results:", err);
    return res.redirect("/interviews/list");
  }
};


