import { z } from 'zod';

const newProduct = z.object({
  nome: z.string({
    required_error: "O nome do produto é um campo obrigatório.",
    invalid_type_error: "O nome do produto precisa ser um texto.",
  })
    .min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' })
    .max(100, { message: 'O nome pode ter no máximo 100 caracteres.' }),
  categoria: z.string({
    required_error: "A categoria do produto é um campo obrigatório.",
    invalid_type_error: "A categoria do produto precisa ser um texto.",
  })
    .min(3, { message: 'A categoria deve ter pelo menos 3 caracteres.' })
    .max(50, { message: 'A categoria pode ter no máximo 50 caracteres.' }),
  qtd_estoque: z.number({
    required_error: "A quantidade em estoque é um campo obrigatório.",
    invalid_type_error: "A quantidade em estoque ser um número.",
  })
    .int()
    .nonnegative({ message: 'A quantidade em estoque não pode ser negativa.' })
    .refine(value => !isNaN(value), {
      message: 'A quantidade em estoque é obrigatória.',
    }),
  preco: z.number({
    required_error: "O preço é um campo obrigatório.",
    invalid_type_error: "O preço precisa ser um número, em centavos.",
  })
    .positive({ message: 'O preço deve ser um valor positivo.' })
    .min(10, { message: 'O preço não pode ser menor que 0,10' })
});

export default newProduct;
