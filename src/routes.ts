import { Router } from 'express';
import addNewProduct  from './controllers/addNewProduct';
import validateProductExistence from './middlewares/validateProductExistence';
import listProducts from './controllers/listProducts';

const routes = Router();

routes.post('/product', 
  validateProductExistence, 
  addNewProduct
);
routes.get('/product/:id');
routes.get('/products', listProducts);
routes.patch('/product/:id');
routes.delete('/product/:id');

export default routes;
