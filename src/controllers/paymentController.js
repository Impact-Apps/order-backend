const express = require('express')
const router = express.Router()
const stripe = require('stripe')('sk_test_3cJsDJW6yKPIWO1tMolUXH0I00S2qw90bw');

router.get('/makePayment', async (req, res) => {
    const {amount, stripeAccountId} = req.query || {}
    const intent = await stripe.paymentIntents.create({
        payment_method_types: ['card'],
        amount: amount * 100,
        currency: 'eur',
        application_fee_amount: 123,
        transfer_data: {
            destination: stripeAccountId,
        },
    })
    return res.json({client_secret: intent.client_secret});
});

module.exports = router