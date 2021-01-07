const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const router = express.Router();


// router.get("/admin/getProduct", adminController.getProduct);
router.post("/addProduct", adminController.addProduct);
router.get("/getProducts", adminController.getProducts);

router.get('/restaurants/:restaurantId', adminController.getRestaurant);

router.get('/places', adminController.getRestaurants);

router.put('/restaurants/:restaurantId', adminController.updateRestaurant);

router.delete("/restaurants/:restaurantId", adminController.deleteRestaurants);

router.post("/addMenu", adminController.addMenu);

router.put("/addMenu", adminController.addMenuItems);

router.get('/getMenu/:menuId', adminController.getMenu);


module.exports = router;
