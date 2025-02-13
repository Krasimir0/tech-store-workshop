import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const deviceController = Router();

deviceController.get('/catalog', (req, res) => {
    
    res.render('devices/catalog');
});

deviceController.get('/create', (req,res) => {
    res.render('devices/create');
});

deviceController.post('/create', isAuth, async (req,res) => {
    const deviceData = req.body;
    const userId = req.user.id;

    try {
        await deviceService.createDevice(deviceData, userId);

        res.redirect('/devices/catalog')
    } catch (err) {
        res.render('devices/create', {
            error: getErrorMessage(err),
            device: deviceData
        });
        
    }
    
});

export default deviceController;