// const Interview=require('../models/Interview');

const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    batch:{
      type:Number,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    college: {
      type: String,
    },
    scores: {
      dsa: {
        type: Number,
      },
      webd: {
        type: Number,
      },
      react: {
        type: Number,
      },
    },
    status: {
      type: String,
      enum: ["placed", "not_placed"],
    },
    interviews: [
      {
        interview: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Interview",
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "On Hold", "Didn’t Attempt"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
