const UserModel =  require('../models/User');

const signUp = async (user) => {
    let err, userRecord
    userRecord = await UserModel.create(user);
    return userRecord;
}

const login = async (email, password) => {
    const userRecord = await UserModel.findOne({ email: email, password: password})
    return userRecord
}

module.exports = {
    signUp,
    login
}
