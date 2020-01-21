/* eslint-disable global-require */
const { OneToManyRelation, HasManyRelation, ManyToManyRelation } = require('objection')
const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const Message = require('./Message')
    const JournalEntry = require('./JournalEntry')

    return {
      requestedFriend: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'friendships.requestorId',
            to: 'friendships.requesteeId',
          },
          to: 'users.id',
        },
      },

      requestingFriend: {
        relation: ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'friendships.requesteeId',
            to: 'friendships.requestorId',
          },
          to: 'users.id',
        },
      },

      messagesSent: {
        relation: OneToManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.senderId',
        },
      },

      messagesReceived: {
        relation: OneToManyRelation,
        modelClass: Message,
        join: {
          from: 'users.id',
          to: 'messages.receiverId',
        },
      },

      journalEntries: {
        relation: HasManyRelation,
        modelClass: JournalEntry,
        join: {
          from: 'users.id',
          to: 'journal.userId',
        },
      },
    }
  }
}

module.exports = User
