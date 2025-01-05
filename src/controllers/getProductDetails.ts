import { TProduct } from '../types/product';
import { Request, Response } from "express";
import { z } from "zod";
import readFile from "../utils/readFile";
import removeAccentsAndSpecialChars from '../utils/removeAccentsAndSpecialChars';

const getProductDetails = async (req: Request, res: Response) => {
  const { param } = req.params;
  
  if(!param) {
    res.status(400).json({
      message: "Por favor, informe um id ou nome válido."
    })
    return;
  }

  try {
    const products = await readFile();
    const normalizedParam = removeAccentsAndSpecialChars(param);
    
    const product = products.find((p: TProduct) => {
      const normalizedName = removeAccentsAndSpecialChars(p.nome || "");
      return p.id === param || normalizedName.includes(normalizedParam);
    });

    if(!product) {
      res.status(404).json({ message : "Produto não encontrado." })
      return;
    }

    res.status(200).json(product)
    return 
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

export default getProductDetails;
