import { Request, Response } from "express";
import readFile from "../utils/readFile";
import { EMode, EOrderByFields, querySchema } from '../schemas/orderFieldsQuery';
import { z } from "zod";
import removeAccentsAndSpecialChars from "../utils/removeAccentsAndSpecialChars";

const listProducts = async (req:  Request, res: Response)  => {
  try {
    const { categoria, ordem, modo } = querySchema.parse(req.query);

    const products = await readFile();
    let filteredProducts = Array.isArray(products) ? products : [];

    const normalizedCategoria = categoria ? removeAccentsAndSpecialChars(categoria) : undefined;
    if (normalizedCategoria) {
      filteredProducts = filteredProducts.filter(product =>
        removeAccentsAndSpecialChars(product.categoria).includes(normalizedCategoria)
      );
    }

    if (ordem) {
      filteredProducts.sort((a, b) => {
        const comparison =
          ordem === EOrderByFields.NOME
            ? a.nome.localeCompare(b.nome)
            : ordem === EOrderByFields.QUANTIDADE
            ? a.qtd_estoque - b.qtd_estoque
            : a.preco - b.preco;

        return modo === EMode.ASC ? comparison : EMode.DESC ? -comparison : null;
      });
    }

    if (filteredProducts.length === 0) {
      res.status(404).json({ message: "Nenhum produto encontrado." });
      return;
    }

    res.status(200).json(filteredProducts);
    return;
  } catch (error) {
    if (error instanceof z.ZodError) {
          const errorMessages = error.errors.map(err => err.message);
      
          res.status(400).json({
            errors: errorMessages
          });
          return;
        }
    res.status(500).json({ message: "Erro interno do servidor." });
		return;
  }
}

export default listProducts;
