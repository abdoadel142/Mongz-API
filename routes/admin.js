const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
//const profileController = require('../controllers/admin');


const router = express.Router();

//router.get('/getData', isAuth, profileController.getProfile);

module.exports = router;