/* eslint-disable global-require */
const { OneToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class JournalEntry extends BaseModel {
  static get tableName() {
    return 'journal'
  }

  static get relationMappings() {
    const User = require('./User')

    return {
      author: {
        relation: OneToOneRelation,
        modelClass: User,
        join: {
          from: 'journal.userId',
          to: 'user.id',
        },
      },
    }
  }
}

module.exports = JournalEntry
