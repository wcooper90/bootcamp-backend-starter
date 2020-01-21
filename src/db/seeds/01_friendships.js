const friendData = require('../../../data/friendship')

exports.seed = knex => knex('friendships').del()
  .then(() => knex('friendships').insert(friendData))
