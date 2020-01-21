const messageData = require('../../../data/message')

exports.seed = knex => knex('messages').del()
  .then(() => knex('messages').insert(messageData))
