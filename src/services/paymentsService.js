const stripe = require('stripe')('sk_test_3cJsDJW6yKPIWO1tMolUXH0I00S2qw90bw');
const MODEL_PATH = '../models/'
const UserModel =  require(MODEL_PATH + 'User');

const addCard = async ({ user, body: { cardToken } }) => {
    if (!user.stripeCustomerId) {
        const stripeCustomerId = await createCustomer(user.email);
        
        await UserModel.collection.findOneAndUpdate(
            { _id: user._id },
            { $set: { stripeCustomerId } },
        );
        
        return addCustomerCard(stripeCustomerId, cardToken);
    }
    
    return addCustomerCard(user.stripeCustomerId, cardToken);
};

const getCards = async ({ user }) => {
    if (!user.stripeCustomerId) return [];
    return await listCustomerCards(user.stripeCustomerId);
};

const createCustomer = async email => { 
    const stripeCustomerId = await stripe.customers.create({ email })
    return stripeCustomerId
}

const addCustomerCard = async (stripeCustomerId, stripeToken) => {
    return await stripe.customers.createSource(stripeCustomerId, { source: stripeToken });
}

const listCustomerCards = async stripeCustomerId => {
    return await stripe.customers.listCards(stripeCustomerId);
}

const findOrCreateStripeCustomer = async (user, tokenId, email) => {
    if(!!user.stripeCustomerId) {
      const newSource = await stripe.customers.createSource(user.stripeCustomerId, { source: tokenId })
      return await stripe.customers.update(user.stripeCustomerId, { default_source: newSource.id })
    } else { // First payment
      return await stripe.customers.create({
        email,
        source: tokenId
      })
    }
}

module.exports = {
    findOrCreateStripeCustomer,
}