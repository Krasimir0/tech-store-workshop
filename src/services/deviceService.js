import Device from "../models/Device.js";

const getDeviceById = (deviceId) => Device.findById(deviceId);

const deleteDevice = async (deviceId, userId) =>  {
        const device = await getDeviceById(deviceId);
        if (!device.owner.equals(userId)) {
            throw new Error("Only owner can delete this offer");
        }
        return Device.findByIdAndDelete(deviceId);
    };

const getAll = () => Device.find({});

const getLatest = () => Device.find({}).sort({_id: 'desc'}).limit(3);

const createDevice = (deviceData, userId) => Device.create( { ...deviceData, owner: userId });

const update = async (deviceId, userId, deviceData) => {
  const device = await getDeviceById(deviceId);

  if (!device.owner.equals(userId)) {
    throw new Error("Only owner can edit this offer");
  }

  return await Device.findByIdAndUpdate(deviceId, deviceData, { runValidators: true });
};

const prefer = async (deviceId, userId) => {
        const device =  await Device.findById(deviceId);
        
        if (device.owner.equals(userId)) {
            throw new Error("Cannot prefer own offer!");
        }

        if (device.prefferedList.includes(userId)) {
            throw new Error("You already preferred this offer!");
        }

        device.prefferedList.push(userId);

        return device.save();
};

const deviceService = {
    createDevice,
    getLatest,
    getAll,
    getDeviceById,
    prefer,
    deleteDevice,
    update,
}

export default deviceService;