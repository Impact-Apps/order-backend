const RestaurantModel =  require('../models/Restaurant');

const create = async restaurant => await RestaurantModel.create(restaurant);

const get = async id => await RestaurantModel.findById(id)

const deleteRestaurant = async id => {
    try {
        await RestaurantModel.findByIdAndRemove(id)
    }
    catch (e) {
        return 'No restaurant with provided id'
    }

    return 'Deleted successfully'
}

const getAll =  async () => await RestaurantModel.find()

module.exports = {
    create,
    get,
    getAll,
    deleteRestaurant
}
