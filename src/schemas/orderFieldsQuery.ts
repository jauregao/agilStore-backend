import { z } from "zod";

export enum EOrderByFields {
  NOME = "nome",
  QUANTIDADE = "quantidade",
  PRECO = "preco",
}

export enum EMode {
  ASC = "asc",
  DESC = "desc",
}

const orderByValues = Object.values(EOrderByFields) as [string, ...string[]];
const modeValues = Object.values(EMode) as [string, ...string[]];

export const querySchema = z.object({
  categoria: z.string().optional(),
  ordem: z
    .enum(orderByValues, { 
      message: "Campo 'ordem' inválido. Valores aceitos: nome, quantidade, preco.",
    })
    .optional(),
  modo: z
    .enum(modeValues, {
        message: "Campo 'modo' inválido. Valores aceitos: asc e desc.",
    })
    .optional(),
});
