import express from "express";
import { PrismaClient } from "../../../prisma/generated/client/index.js";
import Joi from "joi";

const prisma = new PrismaClient();
const router = express.Router();

const productSchema = Joi.object({
  nome: Joi.string().required(),
  descricao: Joi.string().required(),
  imagemUrl: Joi.string().uri().required(),
  preco: Joi.number().precision(2).required(),
  porcentagemDesconto: Joi.number().precision(2).min(0).max(100).required(),
  lojaId: Joi.string().uuid().required(),
  categoriaId: Joi.string().uuid().required(),
});

router.post("/", async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const {
      nome,
      descricao,
      imagemUrl,
      preco,
      porcentagemDesconto,
      lojaId,
      categoriaId,
    } = req.body;

    const newProduct = await prisma.produto.create({
      data: {
        nome,
        descricao,
        imagemUrl,
        preco,
        porcentagemDesconto,
        lojaId,
        categoriaId,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
