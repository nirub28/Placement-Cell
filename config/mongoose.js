const mongoose = require("mongoose");  // data base connection

mongoose.connect("mongodb+srv://nirub:nirub283@cluster0.ye8q8b0.mongodb.net/cdn?retryWrites=true&w=majority");
// mongoose.connect("mongodb+srv://nirub:nirub283@cluster0.ye8q8b0.mongodb.net/cdn?retryWrites=true&w=majority");


const db = mongoose.connection;

db.on("error", console.error.bind("Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Conneted to Database:: MongoDB");
});

module.exports = db;
