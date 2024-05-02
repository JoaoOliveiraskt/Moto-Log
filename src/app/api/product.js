const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  price: Joi.number().precision(2).required(),
  discountPercentage: Joi.number().precision(2).min(0).max(100).required(),
  storeId: Joi.string().uuid().required(),
  categoryId: Joi.string().uuid().required(),
});

router.post("/", async (req, res) => {
  // Endpoint to create a new product
});

module.exports = router;
