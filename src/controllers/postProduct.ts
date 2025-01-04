import { Request, Response } from "express";
import { TProduct } from "../types/product";
import writeFile from "../utils/writeFile";
import newProduct from "../schemas/newProduct";
import { z } from "zod";
import { v4 as uuid } from 'uuid';


const addNewProduct = async (req:  Request, res: Response) => {
  const { nome, qtd_estoque, preco, categoria }: TProduct = req.body;

  try {
		const validatedData = newProduct.parse({
			nome, qtd_estoque, preco, categoria
		});

		const novoProduto = await writeFile({
			id: uuid(),
			...validatedData,
		});

		res.status(201).json(novoProduto);
		return;
	} catch (error) {
		if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => err.message);

      res.status(400).json({
        message: "Dados inválidos.",
        errors: errorMessages
      });
      return;
    }

		res.status(500).json({ message: "Erro interno do servidor." });
		return;
	}
}

export default addNewProduct;
