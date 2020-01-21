/* eslint-disable global-require */
const { OneToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class JournalEntry extends BaseModel {
  static get tableName() {
    return 'journalEntries'
  }

  static get relationMappings() {
    const User = require('./User')

    return {
      author: {
        relation: OneToOneRelation,
        modelClass: User,
        join: {
          from: 'journalEntries.userId',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = JournalEntry
