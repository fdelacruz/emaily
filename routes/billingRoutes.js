const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', (req, res) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!' });
    }

    stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id
    }).then(() => { 
      req.user.credits += 5;
      return req.user.save(); 
    }).then(() => {
      res.send(req.user)
    });
  });
};
