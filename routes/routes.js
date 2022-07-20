var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController');
var userController = require('../controllers/userController');
var messageController = require('../controllers/messageController');
var adminController = require('../controllers/adminController');


/* GET home page. */
router.get('/', homeController.home_get);

// Login Page ...
router.get('/log-in',homeController.login_get);
router.post('/log-in',homeController.login_post);
router.get('/log-out' , homeController.log_out)
//signup 
router.get('/sign-up' ,userController.signup_get );

router.post('/sign-up',userController.signup_post );
//messages 
router.get('/message',messageController.message_create_get);
router.post('/message' , messageController.message_create_post);
router.get('/editMessage/:id' , messageController.message_edit_get)
router.post('/editMessage/:id',messageController.message_edit_post)

//Admin 
router.get('/admin', adminController.admin_get);
router.post('/admin',adminController.admin_post);
router.get('/delete/:id',adminController.delete_message);

//profile
router.get('/profile/:id' , userController.profile_get)
router.get('/add-photo' ,userController.add_photo_get)
router.post('/add-photo' , userController.add_photo_post)
module.exports = router;
