const MODEL_PATH = '../models/'
const RestaurantModel =  require(MODEL_PATH + 'Restaurant');

const create = async restaurant => await RestaurantModel.create(restaurant);

const get = async id => await RestaurantModel.findById(id)

const deleteRestaurant = async id => RestaurantModel.findByIdAndRemove(id)

const getAll =  async () => await RestaurantModel.find()

module.exports = {
    create,
    get,
    getAll,
    deleteRestaurant
}
