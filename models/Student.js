const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
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
        date: {
          type: Date,
        },
        company: {
          type: String,
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
