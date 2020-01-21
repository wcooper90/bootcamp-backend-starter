const journalData = require('../../../data/journalEntry')

exports.seed = knex => knex('journalEntries').del()
  .then(() => knex('journalEntries').insert(journalData))
