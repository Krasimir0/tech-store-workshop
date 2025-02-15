import { Router } from 'express';
import deviceService from '../services/deviceService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

const homeController = Router();

homeController.get('/', async (req, res) => {
    const latestDevices = await deviceService.getLatest();
    res.render('home', { device: latestDevices });
});

homeController.get('/about', (req,res) => {
    res.render('about'); 
});

homeController.get('/profile', isAuth, async (req, res) => {
    const ownDevices = await deviceService.getAll({owner: req.user.id});
    const preferredDevices = await deviceService.getAll({preferredBy: req.user.id});

    res.render('profile', {
        ownDevices,
        preferredDevices
    });
});

export default homeController;