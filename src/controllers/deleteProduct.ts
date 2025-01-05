import { Request, Response } from "express";
import { z } from "zod";
import readFile from "../utils/readFile";
import { TProduct } from "../types/product";
import writeFile from "../utils/writeFile";

const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const products = await readFile();

    const product = products.find((p: TProduct) => p.id === id)
    
    if(!product) {
      res.status(404).json({ message: "Produto não encontrado." });
      return;
    }

    const filteredList = products.filter((p: TProduct) => p.id !== product.id);

    await writeFile(filteredList);

    res.status(204).json();
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
    res.status(500).json({
      message: "Erro interno do servidor."
    })
    return;
  }
}

export default deleteProduct;