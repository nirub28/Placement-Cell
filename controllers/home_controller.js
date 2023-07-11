const Student = require("../models/Student");

module.exports.home = async function (req, res) {
  let students = await Student.find({});    // extract and send students list for home

  return res.render("home", {
    title: "Home",
    all_students: students,
  });
};
