const MODEL_PATH = '../models/'
const UserModel =  require(MODEL_PATH + 'User');

const signUp = async user => await UserModel.create(user);

const login = async (email, password) => await UserModel.findOne({ email: email, password: password});

module.exports = {
    signUp,
    login
}
