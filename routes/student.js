const express=require('express');
const passport=require('passport');
const router=express.Router();
const studentController=require('../controllers/student_controller');


router.get('/profile/:id', studentController.profile);
router.post('/add', studentController.add);
router.get('/delete/:id', studentController.delete);
router.post('/update', studentController.updateDetails);

module.exports=router;