const express = require("express");

const {
  addTOCart,
  getMyCart,
  deleteFromMyCart,
  updateCartById,
  getAllCart
} = require("../controllers/carts");
const authentication = require("../middlewares/authentication");

const cartsRouter = express.Router();

cartsRouter.post("/:id", authentication, addTOCart);
cartsRouter.get("/",authentication, getMyCart);
cartsRouter.get("/All", getAllCart);
cartsRouter.delete("/:id", deleteFromMyCart);
cartsRouter.put("/:id",updateCartById);

module.exports = cartsRouter;
