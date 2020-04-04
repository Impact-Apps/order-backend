const MODEL_PATH = '../models/'
const ItemModel =  require(MODEL_PATH + 'Item');

const create = async item => await ItemModel.create(item);

const get = async id => await ItemModel.findById(id)

const deleteItem = async id => ItemModel.findByIdAndRemove(id)

const getAll =  async () => await ItemModel.find()

const findItemsForMenu = async (itemIds) => await ItemModel.find({ '_id': {$in: itemIds} })

module.exports = {
    create,
    get,
    getAll,
    deleteItem,
    findItemsForMenu,
}
