import Device from "../models/Device.js";

const getLatest = () => Device.find({}).sort({_id: 'desc'}).limit(3);

const createDevice = (deviceData, userId) => Device.create( { ...deviceData, owner: userId });

const deviceService = {
    createDevice,
    getLatest
}

export default deviceService;