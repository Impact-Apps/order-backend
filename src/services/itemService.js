const MODEL_PATH = '../models/'
const ItemModel =  require(MODEL_PATH + 'Item');

const create = async item => await ItemModel.create(item);

const get = async id => await ItemModel.findById(id)

const deleteItem = async id => ItemModel.findByIdAndRemove(id)

const getAll =  async () => await ItemModel.find()

const getAllItemsInMenu = async menuId => await ItemModel.find({menuId})

module.exports = {
    create,
    get,
    getAll,
    deleteItem,
    getAllItemsInMenu,
}
