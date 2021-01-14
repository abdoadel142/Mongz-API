const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const profileController = require('../controllers/profile');


const router = express.Router();

router.get('/getData', isAuth, profileController.getProfile);
router.get('/getAdminData', isAuth, profileController.getAdminData);

module.exports = router;