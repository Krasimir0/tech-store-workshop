import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import deviceService from "../services/deviceService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isOwner } from "../middlewares/deviceMiddlewares.js";

const deviceController = Router();

deviceController.get("/catalog", async (req, res) => {
  const devices = await deviceService.getAll();
  res.render("devices/catalog", { devices });
});

deviceController.get("/create", (req, res) => {
  res.render("devices/create");
});

deviceController.post("/create", isAuth, async (req, res) => {
  const deviceData = req.body;
  const userId = req.user.id;

  try {
    await deviceService.createDevice(deviceData, userId);

    res.redirect("/devices/catalog");
  } catch (err) {
    res.render("devices/create", {
      error: getErrorMessage(err),
      device: deviceData,
    });
  }
});

deviceController.get("/:deviceId/details", async (req, res) => {
  const deviceId = req.params.deviceId;
  
  const device = await deviceService.getDeviceById(deviceId);

  const isOwner = device.owner.equals(req.user?.id);

  const isPreferred = device.preferredList.includes(req.user?.id);

  res.render("devices/details", { device, isOwner, isPreferred });
});

deviceController.get('/:deviceId/delete', async (req,res) => {
      const deviceId = req.params.deviceId;
      const userId = req.user.id;

      try {
        await deviceService.deleteDevice(deviceId, userId);
        res.redirect('/devices/catalog')
      } catch (err) {
        res.render(`/devices/${deviceId}/details`, {error: getErrorMessage(err)});
      }
});

deviceController.get('/:deviceId/edit', async (req,res) => {
      const deviceId = req.params.deviceId;
      const userId = req.user.id;
      const device = await deviceService.getDeviceById(deviceId);
      
      if (!device.owner.equals(userId)) {
        return res.redirect(`/devices/${deviceId}/details`)
      }

      res.render('devices/edit', { device });
});

deviceController.post('/:deviceId/edit', isAuth, isOwner, async (req,res) => {
  const deviceId = req.params.deviceId;
  const deviceData = req.body;
  const userId = req.user.id;
  
  try {
    await deviceService.update(deviceId, userId, deviceData);

    res.redirect(`/devices/${deviceId}/details`);
  } catch (err) {
    res.render(`devices/edit`, { device: deviceData, error: getErrorMessage(err) });
  }
});

deviceController.get('/:deviceId/prefer', isAuth, async (req, res) => {
    const deviceId = req.params.deviceId;
    const userId = req.user.id;

    try {
        await deviceService.prefer(deviceId, userId);
        res.redirect(`/devices/${deviceId}/details`)
    } catch (err) {
        res.render(`devices/${deviceId}/details`, {
            error: getErrorMessage(err),
        });
    }
});

export default deviceController;
