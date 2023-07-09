// DownloadCSVcontroller.js
const fs = require('fs');
const csv = require('csv-writer').createObjectCsvWriter;
const Student = require('../models/Student');

// Handle POST request to download CSV
module.exports.get = async function(req, res) {
  try {
    const students = await Student.find({});

    // Prepare the CSV writer
    const csvWriter = csv({
      path: 'student_details.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'email', title: 'Email' },
        { id: 'college', title: 'College' },
        { id: 'status', title: 'Status' },
        // Add more fields as needed
      ]
    });

    // Prepare the data for CSV
    const data = students.map(student => ({
      name: student.name,
      email: student.email,
      college: student.college,
      // Map more fields as needed
    }));

    // Write the data to CSV
    await csvWriter.writeRecords(data);

    // Set the response headers for downloading the CSV file
    res.setHeader('Content-Disposition', 'attachment; filename=student_details.csv');
    res.setHeader('Content-Type', 'text/csv');

    // Stream the CSV file to the response
    const fileStream = fs.createReadStream('student_details.csv');
    fileStream.pipe(res);
  } catch (err) {
    console.log('Error in generating CSV:', err);
    res.status(500).send('Internal Server Error');
  }
};
