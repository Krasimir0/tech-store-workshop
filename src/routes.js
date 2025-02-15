import { Router } from 'express';
import homeController from './controllers/home-controller.js';
import authController from './controllers/auth-controller.js';
import deviceController from './controllers/device-controller.js';

const routes = Router();

routes.use(homeController);
routes.use('/auth', authController);
routes.use('/devices', deviceController);
routes.all('*', (req, res) => {
    res.render('404')
});

export default routes;