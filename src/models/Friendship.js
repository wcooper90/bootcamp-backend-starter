const BaseModel = require('./BaseModel')

class Friendship extends BaseModel {
  static get tableName() {
    return 'friendships'
  }
}
module.exports = Friendship
