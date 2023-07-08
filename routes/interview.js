const express=require('express');
const passport=require('passport');
const router=express.Router();
const interviewController=require('../controllers/interview_controller');



router.get('/list', interviewController.showList);


// router.get('/profile/:id', studentController.profile);
// router.post('/add', studentController.add);
// router.get('/delete/:id', studentController.delete);


module.exports=router;