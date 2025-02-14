import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const deviceController = Router();

deviceController.get('/catalog', async (req, res) => {
    const devices = await deviceService.getAll();
    res.render('devices/catalog', { devices });
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
deviceController.get('/:deviceId/details', (req, res) => {
    const deviceId = req.params.deviceId;

    res.render('devices/details')
});
});

export default deviceController;