const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_3cJsDJW6yKPIWO1tMolUXH0I00S2qw90bw');
const userService = require('../services/userService')
const restaurantService = require('../services/restaurantService')
const paymentsService = require('../services/paymentsService')
const { get } = require('lodash')

router.get('/makePayment', async (req, res) => {
    const {amount, stripeAccountId} = req.query || {}
    const intent = await stripe.charges.create({
        payment_method_types: ['card'],
        amount: amount * 100,
        currency: 'eur',
        application_fee_amount: 123,
        on_behalf_of: stripeAccountId,
        transfer_data: {
            destination: stripeAccountId,
        },
    })
    return res.json({client_secret: intent.client_secret});
});


router.post('/doPayment', async (req, res) => {
    console.log('here')
    const { userId, tokenId, amount = 0, stripeAccountId, email } = req.body || {}
    // hack - update sellers TOS before making first payment - can set all other fields on dashboard
    // await stripe.accounts.update(
    //     stripeAccountId,
    //     {
    //       tos_acceptance: {
    //         date: Math.floor(Date.now() / 1000),
    //         ip: req.connection.remoteAddress, // Assumes you're not using a proxy
    //       },
    //     }
    //   );
    const user = await userService.get(userId) // Some method to get a user from the database
    const stripeCustomer = await paymentsService.findOrCreateStripeCustomer(user, tokenId, email)
    if(!get(user, 'stripeCustomerId', null)) {
        await userService.updateUser(userId, {stripeCustomerId: stripeCustomer.id})
    }
    console.log(stripeCustomer, user)
    console.log(stripeAccountId)
    const payment = await stripe.charges.create({
        amount, // Unit: cents
        currency: 'eur',
        customer: stripeCustomer.id,
        source: stripeCustomer.default_source.id,
        description: 'Test payment',
        application_fee_amount: 123,
        on_behalf_of: stripeAccountId,
        transfer_data: {
            destination: stripeAccountId,
        },
    })
    return res.json(payment)
});

router.post('/addCard', async (req, res, next) => {
    const card = await addCard(req)
    return res.json(card)
});

router.get('/getCards', async (req, res, next) => {
    const cards = await getCards(req)
    return res.json(cards)
});

router.get('/:restaurantId/setup', async (req, res, next) => {
    const { restaurantId } = req.params 
    const restaurants = await restaurantService.get({_id: restaurantId})
    const { stripeAccountId } = restaurants[0]
    const accountSetupLink = await paymentsService.getAccountSetUpLink(stripeAccountId)
    return res.json(accountSetupLink)
})

router.get('/:restaurantId/setupBankAccount', async (req, res, next) => {
    const { restaurantId } = req.params 
    const { token } = req.query
    const restaurants = await restaurantService.get({_id: restaurantId})
    const { stripeAccountId } = restaurants[0]
    const accountUpdate = await paymentsService.addExternalAccount(stripeAccountId, token)
    return res.json(accountUpdate)
})

module.exports = router