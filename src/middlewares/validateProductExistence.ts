import { Request, Response, NextFunction } from 'express';
import { TProduct } from '../types/product';
import readFile from '../utils/readFile';

const validateProductExistence = async (req: Request, res: Response, next: NextFunction) => {
  const { nome, qtd_estoque, preco, categoria } = req.body;

  try {
    const products = await readFile();

    const productInJSON = products.find((product: TProduct) => 
      product.nome === nome &&
      product.qtd_estoque === qtd_estoque &&
      product.preco === preco &&
      product.categoria === categoria
    );

    if (productInJSON) {
      res.status(400).json({ message: 'Este produto já existe na base de dados.' });
      return;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
};

export default validateProductExistence;
