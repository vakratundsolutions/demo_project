var express = require('express');
var router = express.Router();
const userController = require('../controller/user')

/* Signup */
router.post('/signup',userController.signUp );
/* Signin */
router.post('/signin',userController.signIn );
router.get('/alluser',userController.allUser );

module.exports = router;
