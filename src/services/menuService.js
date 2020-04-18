const MODEL_PATH = '../models/'
const MenuModel =  require(MODEL_PATH + 'Menu');

const create = async menu => await MenuModel.create(menu);

const get = async id => await MenuModel.findById(id)

const getByRestaurantId = async restaurantId => await MenuModel.findOne({ restaurantId })

const deleteMenu = async id => MenuModel.findByIdAndRemove(id)

const getAll =  async () => await MenuModel.find()

const updateMenuWithNewItems = async (items, restaurantId) => {
    
    await MenuModel.findOneAndUpdate({ restaurantId }, { $push: { itemIds: { $each: [...items] } } })
}

module.exports = {
    create,
    get,
    getAll,
    deleteMenu,
    getByRestaurantId,
    updateMenuWithNewItems,
}
