const MODEL_PATH = '../models/'
const OrderModel = require(MODEL_PATH + 'Order');

const create = async order => await OrderModel.create(order);

const get = async id => await OrderModel.findById(id)

const deleteOrder = async id => OrderModel.findByIdAndRemove(id)

const updateOrder = async (id, update) => OrderModel.updateOne({_id: id}, update);

const getAll = async filter => await OrderModel.find(filter)

const getByRestaurantId = async  restaurantId => await OrderModel.find({'restaurantId': restaurantId})


module.exports = {
    create,
    get,
    getAll,
    deleteOrder,
    getByRestaurantId,
    updateOrder,
}
