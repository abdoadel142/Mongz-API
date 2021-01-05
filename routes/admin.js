const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

// router.get("/admin/getProduct", adminController.getProduct);

router.get("/getProducts", adminController.getProducts);

router.post("/addProduct", adminController.addProduct);
router.get("/restaurants/:restaurantId", adminController.getRestaurant);

router.put("/restaurants/:restaurantId", adminController.updateRestaurant);

router.delete("/restaurants/:restaurantId", adminController.deleteRestaurants);
router.post("/addMenu", adminController.addMenu);

module.exports = router;
