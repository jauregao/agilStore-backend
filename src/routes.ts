import { Router } from 'express';
import addNewProduct from './controllers/postProduct';
import validateProductExistence from './middlewares/validateProductExistence';

const routes = Router();

routes.post('/product', validateProductExistence, addNewProduct);
routes.get('/product/:id');
routes.get('/products');
routes.patch('/product/:id');
routes.delete('/product/:id');

export default routes;