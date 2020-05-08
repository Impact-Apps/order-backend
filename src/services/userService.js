const MODEL_PATH = '../models/'
const UserModel =  require(MODEL_PATH + 'User');

const getOrCreate = async auth0Id => await UserModel.collection.findOneAndUpdate(
    { auth0Id },
    {
        $setOnInsert: { auth0Id },
    },
    {
        returnOriginal: false,
        upsert: true,
    }
);

module.exports = {
    getOrCreate
}
