const express=require('express');
const passport=require('passport');
const router=express.Router();
const interviewController=require('../controllers/interview_controller');



router.get('/list', passport.checkAuthentication, interviewController.showList);
router.post('/create', interviewController.createInterview);
router.get('/interview/:id', interviewController.interviewDetail);
router.post("/update-results", interviewController.updateResults);



module.exports=router;