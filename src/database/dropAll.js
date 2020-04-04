const mongoose = require('mongoose');
const { mongoUrl } = require('../../dbConstants');

dropAllCollections = async () => {


    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
        useFindAndModify: false
    };


    await mongoose.connect(mongoUrl, mongooseOpts);
    await mongoose.connection.db.dropDatabase();
    process.exit(0)
}
dropAllCollections()
