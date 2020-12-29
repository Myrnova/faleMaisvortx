import { Router } from 'express';

import priceRouter from './price.routes'

const routes = Router();


routes.use('/price', priceRouter)

export default routes;
