import fs from 'fs/promises';
import path from 'path';
import { TProduct } from '../types/product';

const writeFile = async (productList: TProduct[]) => {
  const jsonFilePath = path.resolve(__dirname, "../database/db.json");

  try {
    const jsonData = JSON.stringify(productList, null, 2);
    await fs.writeFile(jsonFilePath, jsonData, "utf-8");
    
    return productList;
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
  }
}

export default writeFile;
