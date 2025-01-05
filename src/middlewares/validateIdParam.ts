import { NextFunction, Request, Response } from "express";

const validateIdParam = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if(!id) {
    res.status(400).json({ message: "Por favor, informe um id válido." })
    return;
  }

  next();
}

export default validateIdParam;
