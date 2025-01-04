import fs from 'fs/promises';
import path from 'path';

const readFile = async () => {
  try {
    const jsonFilePath = path.resolve(__dirname, "../database/db.json");
    const fileData = await fs.readFile(jsonFilePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
  }
}

export default readFile;
