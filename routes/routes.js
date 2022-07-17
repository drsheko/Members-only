var express = require('express');
var router = express.Router();
var homeController = require('../controllers/homeController')
var userController = require('../controllers/userController')
var messageController = require('../controllers/messageController');
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
router.get('/message',messageController.message_get);
router.post('/message' , messageController.message_post)
//users 
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });


module.exports = router;
