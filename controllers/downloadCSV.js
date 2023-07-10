const fs = require("fs");
const csv = require("csv-writer").createObjectCsvWriter;
const Student = require("../models/Student");

// Handle POST request to download CSV
module.exports.get = async function (req, res) {
  try {
    const students = await Student.find({}).populate("interviews.interview");

    // Prepare the CSV writer
    const csvWriter = csv({
      path: "student_details.csv",
      header: [
        { id: "studentId", title: "Student ID" },
        { id: "studentName", title: "Student Name" },
        { id: "studentBatch", title: "Batch" },
        { id: "studentCollege", title: "Student College" },
        { id: "studentStatus", title: "Student Status" },
        { id: "dsaFinalScore", title: "DSA Final Score" },
        { id: "webDFinalScore", title: "WebD Final Score" },
        { id: "reactFinalScore", title: "React Final Score" },
        { id: "interviewDate", title: "Interview Date" },
        { id: "interviewCompany", title: "Interview Company" },
        { id: "interviewStudentResult", title: "Interview Student Result" },
      ],
    });

    // Prepare the data for CSV
    const data = [];
    students.forEach((student) => {
      student.interviews.forEach((interview) => {
        const rowData = {
          studentId: student.email,
          studentName: student.name,
          studentBatch: student.batch,
          studentCollege: student.college,
          studentStatus: student.status,
          dsaFinalScore: student.scores.dsa,
          webDFinalScore: student.scores.webd,
          reactFinalScore: student.scores.react,
          interviewDate: interview.interview.date.toISOString().split("T")[0],
          interviewCompany: interview.interview.company,
          interviewStudentResult: interview.result,
        };
        data.push(rowData);
      });
    });

    // Write the data to CSV
    await csvWriter.writeRecords(data);

    // Set the response headers for downloading the CSV file
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=student_details.csv"
    );
    res.setHeader("Content-Type", "text/csv");

    // Stream the CSV file to the response
    const fileStream = fs.createReadStream("student_details.csv");
    fileStream.pipe(res);
  } catch (err) {
    console.log("Error in generating CSV:", err);
    res.status(500).send("Internal Server Error");
  }
};
