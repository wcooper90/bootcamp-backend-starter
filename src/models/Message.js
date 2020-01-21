const { OneToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')

class Message extends BaseModel {
  static get tableName() {
    return 'messages'
  }

  static get relationMappings() {
    // eslint-disable-next-line global-require
    const User = require('./User')

    return {

      sender: {
        relation: OneToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.senderId',
          to: 'users.id',
        },
      },

      receiver: {
        relation: OneToOneRelation,
        modelClass: User,
        join: {
          from: 'messages.receiverId',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Message
