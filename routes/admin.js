const express = require('express');
const { body } = require('express-validator/check');
const AdminController = require('../controllers/admin');
const router = express.Router();

router.post('/admin/addProduct', adminController.addProduct);

router.get('/admin/getProduct',adminController.getProduct);
module.exports = router;