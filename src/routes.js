import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import authController from './controllers/auth-controller.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);

export default routes;