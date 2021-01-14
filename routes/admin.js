const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");
const router = express.Router();
const multer = require("multer");
const Image = require("../models/image");

// router.get("/admin/getProduct", adminController.getProduct);
router.post("/addProduct", adminController.addProduct);

router.get("/getProducts", adminController.getProducts);

router.get("/restaurants/:restaurantId", adminController.getRestaurant);
router.get("/pharmacies/:pharmacieId", adminController.getPharmacie);
router.get("/groceries/:grocerieId", adminController.getGrocerie);

router.get("/places", adminController.getRestaurants);

router.put("/restaurants/:restaurantId", adminController.updateRestaurant);

router.delete("/restaurants/:restaurantId", adminController.deleteRestaurants);
router.delete("/pharmacies/:pharmacieId", adminController.deletePharmacies);
router.delete("/groceries/:grocerieId", adminController.deleteGroceries);

router.post("/addMenu", adminController.addMenu);
router.put("/addMenu", adminController.addMenuItems);

router.get("/getMenu/:menuId", adminController.getMenu);

router.get("/getCart/:userId", adminController.getCart);
router.post("/addCart", adminController.addCart);
router.delete("/removeFromCart/:userId:itemId", adminController.reomveFromCart);
router.delete("/clearCart/:userId", adminController.reomveCart);
//router.post('/setImage',upload.single('upload'),adminController.postImage);

module.exports = router;
