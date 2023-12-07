var express = require('express');
var router = express.Router();
const contactController = require('../controller/contact')
const userController = require('../controller/user')

/* create */
router.post('/create', userController.checkJwt, contactController.addContact);
/* all */
router.get('/allcontact', userController.checkJwt, contactController.allContact);
/* edit */
router.put('/editcontact/:id', userController.checkJwt, contactController.editContact);
/* delete */
router.delete('/deletecontact/:id', userController.checkJwt, contactController.deleteContact);

module.exports = router;
