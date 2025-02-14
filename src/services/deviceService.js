import Device from "../models/Device.js";

const getAll = () => Device.find({});

const getLatest = () => Device.find({}).sort({_id: 'desc'}).limit(3);

const createDevice = (deviceData, userId) => Device.create( { ...deviceData, owner: userId });

const deviceService = {
    createDevice,
    getLatest,
    getAll
}

export default deviceService;