const MODEL_PATH = '../models/'
const OrderModel = require(MODEL_PATH + 'Order');

const create = async order => await OrderModel.create(order);

const get = async id => await OrderModel.findById(id)

const deleteOrder = async id => OrderModel.findByIdAndRemove(id)

const getAll =  async () => await OrderModel.find()


module.exports = {
    create,
    get,
    getAll,
    deleteOrder,
}
