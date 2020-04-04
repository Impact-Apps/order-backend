const mongoose = require('mongoose');
const { mongoUrl } = require('../../dbConstants');
const ItemModel =  require('../models/Item');
const RestaurantModel =  require('../models/Restaurant');
const MenuModel =  require('../models/Menu');
const itemsToAdd = require('./sampleData/items')
const restaurantsToAdd = require('./sampleData/restaurants')
sampleData = async () => {


    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        useFindAndModify: false
    };

    await mongoose.connect(mongoUrl, mongooseOpts);
    await mongoose.connection.db.dropDatabase();

    const insertedItems = await ItemModel.collection.insert(itemsToAdd)
    const insertedItemsIdsArr = Object.values(insertedItems.insertedIds)
    console.log(insertedItemsIdsArr)


    const insertedRestaurants = await RestaurantModel.collection.insert(restaurantsToAdd.slice(0,3))

    const insertedRestaurantsIdsArr = Object.values(insertedRestaurants.insertedIds)
    console.log(insertedRestaurantsIdsArr)
    const menusToAdd = [
            {restaurantId: insertedRestaurantsIdsArr[0], itemIds: insertedItemsIdsArr.slice(0,5)},
            {restaurantId: insertedRestaurantsIdsArr[1], itemIds: insertedItemsIdsArr.slice(5,10)},
            {restaurantId: insertedRestaurantsIdsArr[0], itemIds: insertedItemsIdsArr.slice(10,15)}
        ]

    const insertedMenus = await MenuModel.collection.insert(menusToAdd)


    const insertedMenusIdsArr = Object.values(insertedMenus.insertedIds)
    console.log(insertedMenusIdsArr)

    process.exit(0)
}
sampleData()
