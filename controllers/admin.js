const Restaurants = require("../models/restaurants");
const Pharmacies = require("../models/pharmacies");
const Groceries = require("../models/groceries");
const Product = require("../models/post");

exports.addProduct = async (req, res, next) => {
  // id = req.body.id;
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const imageUrl = req.body.imageUrl;
  const address = req.body.address;
  const openingHour = req.body.openingHour;
  const closingHour = req.body.closingHour;
  // menuId = req.body.menuId;
  const rate = req.body.rate;
  const openingHours = openingHour + " - " + closingHour;

  if (type === "restaurant") {
    const restaurant = new Restaurants({
      name: name,
      type: type,
      description: description,
      location: { longitude, latitude },
      imageUrl: imageUrl,
      address: address,
      openingHours: openingHours,
      // menuId: menuId,
      rate: rate,
    });
    await restaurant.save();
    res
      .status(200)
      .json({ message: type + "created", restaurantId: restaurant._id });
  }
  if (type === "pharmacie") {
    const pharmacie = new Pharmacies({
      name: name,
      type: type,
      description: description,
      location: { longitude, latitude },
      imageUrl: imageUrl,
      address: address,
      openingHours: openingHours,
      // menuId: menuId,
      rate: rate,
    });
    await pharmacie.save();
    res
      .status(200)
      .json({ message: type + "created", pharmacieId: pharmacie._id });
  }
  if (type === "grocerie") {
    const grocerie = new Groceries({
      name: name,
      type: type,
      description: description,
      location: { longitude, latitude },
      imageUrl: imageUrl,
      address: address,
      openingHours: openingHours,
      // menuId: menuId,
      rate: rate,
    });
    await grocerie.save();
    res
      .status(200)
      .json({ message: type + "created", grocerieId: grocerie._id });
  } else {
    Error = "not valid type ";
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const restaurants = await Restaurants.find();
    const groceries = await Groceries.find();
    const pharmacies = await Pharmacies.find();
    res.status(200).json({
      message: "Fetched Products successfully.",
      restaurants: restaurants,
      pharmacies: pharmacies,
      groceries: groceries,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteRestaurants = async (req, res, next) => {
  const restaurantId = req.params.restaurantId;
  console.log(restaurantId);
  try {
    const restaurant = await Restaurants.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Could not find Restaurant.");
      error.statusCode = 404;
      throw error;
    }
    await Restaurants.findByIdAndRemove(restaurantId);
    res.status(200).json({ message: "Deleted post." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRestaurant = async (req, res, next) => {
  const restaurantId = req.params.restaurantId;
  const restaurant = await Restaurants.findById(restaurantId);
  try {
    if (!restaurant) {
      const error = new Error("Could not find Restaurant.");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "Restaurant fetched.", restaurant: restaurant });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateRestaurant = async (req, res, next) => {
  const restaurantId = req.params.restaurantId;

  const name = req.body.name;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const imageUrl = req.body.imageUrl;
  const address = req.body.address;
  const openingHour = req.body.openingHour;
  const closingHour = req.body.closingHour;
  // menuId = req.body.menuId;
  const rate = req.body.rate;
  const openingHours = openingHour + " - " + closingHour;

  try {
    const restaurant = await Restaurants.findById(restaurantId);
    if (!restaurant) {
      const error = new Error("Could not find restaurant.");
      error.statusCode = 404;
      throw error;
    }

    restaurant.name = name;
    restaurant.description = description;
    restaurant.rate = rate;
    restaurant.address = address;
    restaurant.openingHours = openingHours;
    restaurant.location = { latitude, longitude };

    const result = await restaurant.save();
    res
      .status(200)
      .json({ message: "Restaurant updated!", restaurant: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
