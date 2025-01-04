import fs from 'fs/promises';
import path from 'path';
import { TProduct } from '../types/product';

const writeFile = async (newProduct: TProduct) => {
  const jsonFilePath = path.resolve(__dirname, "../database/db.json");

  let existingData: TProduct[] = [];
  try {
    const fileData = await fs.readFile(jsonFilePath, 'utf-8');
    existingData = JSON.parse(fileData);

    const updatedData = [...existingData, newProduct];
    const jsonData = JSON.stringify(updatedData, null, 2);
    await fs.writeFile(jsonFilePath, jsonData, 'utf-8');

    return updatedData;
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
  }
}

export default writeFile;
