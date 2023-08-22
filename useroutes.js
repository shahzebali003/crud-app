const express=require('express');
const userController=require('./userController')


const router= express.Router();


// Route for user login
router.route('/login').post(userController.login);

// Route for user signup
router.route('/signup').post(userController.signup);

// Route for updating user password
router.route('/update-password').patch(userController.updatePassword);

module.exports = router;
