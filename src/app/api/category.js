const express = require("express");
const Joi = require("joi");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

const categorySchema = Joi.object({
  name: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
});

router.post("/", async (req, res) => {
  // Endpoint to create a new category
});

module.exports = router;
