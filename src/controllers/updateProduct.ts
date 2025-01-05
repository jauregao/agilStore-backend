import { Request, Response } from "express";
import readFile from "../utils/readFile";
import { TProduct } from "../types/product";
import writeFile from "../utils/writeFile";
import product from "../schemas/product";
import { z } from "zod";

const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nome, categoria, qtd_estoque, preco } = req.body;

  if(!nome && !categoria && !qtd_estoque && !preco) {
    res.status(400).json({ message: "Pelo menos um campo deve ser enviado para atualização."});
  }

  try {
    const products: TProduct[] = await readFile();

    const validateData = product.partial().parse({
      nome,
      categoria,
      qtd_estoque,
      preco,
    });

    const productIndex = products.findIndex((p: TProduct) => p.id === id);
    if (productIndex === -1) {
      res.status(404).json({
        message: "Produto não encontrado.",
      });
      return;
    }

    const updatedProduct: TProduct = {
      ...products[productIndex],
      nome: validateData.nome || products[productIndex].nome,
      categoria: validateData.categoria || products[productIndex].categoria,
      qtd_estoque: validateData.qtd_estoque !== undefined ? qtd_estoque : products[productIndex].qtd_estoque,
      preco: validateData.preco !== undefined ? preco : products[productIndex].preco,
    };

    products[productIndex] = updatedProduct;

    await writeFile(products);

    res.status(200).json(products)
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

export default updateProduct;
