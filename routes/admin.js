const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const router = express.Router();


// router.get("/admin/getProduct", adminController.getProduct);
router.post("/addProduct", adminController.addProduct);
router.get("/getProducts", adminController.getProducts);

module.exports = router;
