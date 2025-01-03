import { Router } from 'express';

const routes = Router();

routes.post('/product');
routes.get('/product/:id');
routes.get('/products');
routes.put('/products');
routes.delete('/products');

export default routes;