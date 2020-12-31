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
  let Error;
  let place;

  const openingHours = openingHour + " - " + closingHour;
  // const location = {
  //   latitude,
  //   longitude,
  // };

  if (type === "restaurant") {
    const restaurant = new Restaurants({
      name: name,
      type: type,
      description: description,
      location: {longitude,latitude},
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
      location: {longitude,latitude},
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
      location: {longitude,latitude},
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
  // place({
  //   name: name,
  //   type: type,
  //   description: description,
  //   location: location,
  //   imageUrl: imageUrl,
  //   address: address,
  //   openingHours: openingHours,
  //   // menuId: menuId,
  //   rate: rate,
  // });
  // await place.save();
  // res.status(200).json({ message: type + "created", placeId: place._id });
};

exports.getProducts = async (req, res, next) => {
  try {
    const Products = await Product.find();

    res.status(200).json({
      message: "Fetched Products successfully.",
      posts: Products,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  // id = req.body.id;
  // type = req.body.type;
  // Name = req.body.name;
  // let Error;
  // let place;
  // if (type === "restaurants") {
  //   place = new Restaurants();
  // }
  // if (type === "pharmacies") {
  //   place = new Pharmacies();
  // }
  // if (type === "groceries") {
  //   place = new Groceries();
  // } else {
  //   Error = "not valid type ";
  // }

  // const places = await place.find();
  // res.status(200).json({ message: "data fetched", places: places });
};
