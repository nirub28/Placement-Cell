const User=require('../models/User');

//profile page
module.exports.profile = async function(req, res) {
   try {
     const user = await User.findById(req.params.id);
     return res.render('user_profile', {
       title: "Profile",
       profile_user: user
     });
   } catch (err) {
     console.log('Error in finding user:', err);
   }
 };

//get sign up data
module.exports.create= async function(req,res){
    if(req.body.password != req.body.confirm_password){
       req.flash('error', 'Mismatch password');
       return res.redirect('back');
    }
       
    try{
      const existingUser = await User.findOne({ email: req.body.email });

      if (!existingUser) {
         const newUser = await User.create(req.body);
         // req.flash('success', 'New User created');
         return res.redirect('/users/sign-in');
       } else {
         // req.flash('success', 'User Already Avilabe, Please login');
         console.log('user already there :login')
         return res.redirect('/users/sign-in');
       }

    }catch(err){
      console.log('Error in creating user', err);
   }
 
 }

module.exports.signIn=function(req,res){

    // if(req.isAuthenticated()){
    //    return res.redirect('/users/profile')
    // }
    return res.render('user_sign_in',{
       title:"Sign | In"
    });
 }

 module.exports.signUp=function(req,res){
    // if(req.isAuthenticated()){
    //    return res.redirect('/users/profile')
    // }
 
    return res.render('user_sign_up',{
       title:"Sign | up"
    });
 }

 // creating session
 module.exports.createSession=function(req,res){
   console.log("Logged in Successfully");
   //req.flash('success', 'Logged in Successfully');
     return res.redirect('/');
}



module.exports.destroySession=function(req,res){
   //logout before redirecting this fun given by passport
      
        req.logout(function(err){
         if(err){
            console.log('Unable to perform logout');
         }
        });
      console.log('You are loggedOut');
      return res.redirect('/users/sign-in');
   }