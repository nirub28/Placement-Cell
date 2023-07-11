const express = require("express");
const passport = require("passport");
const router = express.Router();
const studentController = require("../controllers/student_controller");
const DownloadCSVcontroller = require("../controllers/downloadCSV");

router.get("/profile/:id", studentController.profile);
router.post("/add", studentController.add);
router.get("/delete/:id", studentController.delete);
router.post("/update", studentController.updateDetails);
router.get(
  "/download",                               // to download data
  passport.checkAuthentication,
  DownloadCSVcontroller.get
);

module.exports = router;
