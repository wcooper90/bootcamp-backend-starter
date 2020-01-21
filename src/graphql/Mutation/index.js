const merge = require('lodash.merge')
const Auth = require('./Auth')
const Message = require('./Message')
const Journal = require('./Journal')
const Friend = require('./Friend')

const resolvers = [Auth, Message, Journal, Friend]

module.exports = merge(...resolvers)
