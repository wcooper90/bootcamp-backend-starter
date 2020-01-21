/* eslint-disable global-require */
const { OneToManyRelation, HasManyRelation } = require('objection')
const BaseModel = require('./BaseModel')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }
  
  static get relationMappings() {
    const Message = require('./Messages')
    const Journal = require('./Journal')

    return {
      requestedFriend: {
        relation: OneToManyRelation,
        modelClass: User,
        join: {
          from: 'user.id',
          through: {
            from: 'friends.requestorId',
            to: 'friends. requesteeId',
          },
          to: 'user.id',
        },
      },

      requestingFriend: {
        relation: OneToManyRelation,
        modelClass: User,
        join: {
          from: 'user.id',
          through: {
            from: 'friends.requesteeId',
            to: 'firends. requestorId',
          },
          to: 'user.id',
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

      JournalEntry: {
        relation: HasManyRelation,
        modelClass: Journal,
        join: {
          from: 'users.id',
          to: 'journal.userId',
        },
      },
    }
  }
}

module.exports = User
