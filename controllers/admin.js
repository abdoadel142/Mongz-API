const Restaurants = require("../models/restaurants");
const Pharmacies = require("../models/pharmacies");
const Groceries = require("../models/groceries");
const Product = require("../models/post");
const Menu = require("../models/menu");

exports.addProduct = async (req, res, next) => {
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.description;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const imageUrl = req.file.path;
  const address = req.body.address;
  const openingHour = req.body.openingHour;
  const closingHour = req.body.closingHour;
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

exports.deletePharmacies = async (req, res, next) => {
  const pharmacieId = req.params.pharmacieId;
  console.log(pharmacieId);
  try {
    const pharmacie = await Pharmacies.findById(pharmacieId);
    if (!pharmacie) {
      const error = new Error("Could not find Restaurant.");
      error.statusCode = 404;
      throw error;
    }
    await Pharmacies.findByIdAndRemove(pharmacieId);
    res.status(200).json({ message: "Deleted pharmacie." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteGroceries = async (req, res, next) => {
  const grocerieId = req.params.grocerieId;
  console.log(grocerieId);
  try {
    const grocerie = await Groceries.findById(grocerieId);
    if (!grocerie) {
      const error = new Error("Could not find Grocerie.");
      error.statusCode = 404;
      throw error;
    }
    await Groceries.findByIdAndRemove(grocerieId);
    res.status(200).json({ message: "Deleted Grocerie." });
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
exports.getPharmacie = async (req, res, next) => {
  const pharmacieId = req.params.pharmacieId;
  const pharmacie = await Pharmacies.findById(pharmacieId);
  try {
    if (!pharmacie) {
      const error = new Error("Could not find pharmacie.");
      error.statusCode = 404;
      throw error;
    }
    res
      .status(200)
      .json({ message: "pharmacie fetched.", pharmacie: pharmacie });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getGrocerie = async (req, res, next) => {
  const grocerieId = req.params.grocerieId;
  const grocerie = await Groceries.findById(grocerieId);
  try {
    if (!grocerie) {
      const error = new Error("Could not find pharmacie.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Grocerie fetched.", grocerie: grocerie });
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
exports.addMenu = async (req, res, next) => {
  const restaurantId = req.body.restaurantId;
  const restaurantName = req.body.restaurantName;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const type = req.body.type;
  const restaurant = await Restaurants.findById(restaurantId);

  const menu = new Menu({
    _id: restaurant,
    restaurantName: restaurantName,
    items: [
      {
        name: name,
        description: description,
        price: price,
        type: type,
      },
    ],
  });
  await menu.save();
  res.status(200).json({ message: type + "created", menuId: menu._id });
};

exports.addMenuItems = async (req, res, next) => {
  const restaurantId = req.body.restaurantId;
  const restaurantName = req.body.restaurantName;
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  const type = req.body.type;

  try {
    const restaurant = await Restaurants.findById(restaurantId);
    const menu = await Menu.findById(restaurantId);
    if (!menu) {
      const menu = new Menu({
        _id: restaurant,
        restaurantName: restaurantName,
        items: [
          {
            name: name,
            description: description,
            price: price,
            type: type,
          },
        ],
      });
      await menu.save();
      res.status(200).json({ message: type + "created", menuId: menu._id });
    } else {
      console.log(menu.items.length);
      menu.restaurantName = req.body.restaurantName;
      menu.items[menu.items.length] = {
        name: name,
        description: description,
        price: price,
        type: type,
      };

      const result = await menu.save();
      res.status(200).json({ message: "Menu updated!", menu: result });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getRestaurants = async (req, res, next) => {
  const restaurant = await Restaurants.find();
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

exports.getMenu = async (req, res, nex) => {
  const menuId = req.params.menuId;
  const menu = await Menu.findById(menuId);

  try {
    if (!menu) {
      const error = new Error("Could not find Menu.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Menu fetched.", menu: menu });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.params.userId;
  const userData = await user.findById(userId);
  const items = [];
  const quantities = [];
  const data = await userData.cart.items;
  if (userData) {
    for (const i of userData.cart.items) {
      const menuId = i.menuId;
      const menuItem = i.itemId;
      const quantity = i.quantity;
      const menu = await Menu.findById(menuId).find({ "items._id": menuItem });
      items.push(menu);
      quantities.push(quantity);
    }

    res
      .status(200)
      .json({ message: "fetched", items: items, quantities: quantities });
  }
};

exports.reomveFromCart = async (req, res, next) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;
  const users = await user.findById(userId);
  users.reomveFromCart(itemId);
  res.status(200).json({ message: "successfully" });
};

exports.reomveCart = async (req, res, next) => {
  const userId = req.params.userId;
  const itemId = req.params.itemId;
  console.log("gggggggggggggggggggggggggggggggggggg");
  const users = await user.findById(userId);
  await users.clearCart();
  res.status(200).json({ message: "successfully" });
};

exports.addCart = async (req, res, next) => {
  const userId = req.body.userId;
  const menuId = req.body.menuId;
  const itemId = req.body.itemId;

  const users = await user.findById(userId);
  if (users) {
    const menu = await Menu.findById(menuId);
    if (menu) {
      //   const item = await menu.items.findById(itemId);

      // console.log(item.name);

      users.addToCart(itemId, menuId);
      console.log(users._id);

      res.status(200).json({ message: "created", menuId: menu._id });
    } else {
      Error = "not valid type ";
    }
  }
  console.log("dddddddd");
};
