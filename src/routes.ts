import { Router } from 'express';
import addNewProduct  from './controllers/addNewProduct';
import validateProductExistence from './middlewares/validateProductExistence';
import listProducts from './controllers/listProducts';
import updateProduct from './controllers/updateProduct';
import getProductDetails from './controllers/getProductDetails';

const routes = Router();

routes.post('/product', 
  validateProductExistence, 
  addNewProduct
);
routes.get('/product/:param', getProductDetails);
routes.get('/products', listProducts);
routes.patch('/product/:id', updateProduct);
routes.delete('/product/:id');

export default routes;
