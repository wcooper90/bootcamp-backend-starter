/* eslint-disable no-console */
const moment = require('moment')
const Message = require('../../models/Message')


const sendMessage = async (obj, {
  input: {
    content, senderId, receiverId,
  },
}) => {
  console.log('finna send a message')
  try {
    const message = await Message.query().insertAndFetch({
      content,
      senderId,
      receiverId,
      dateSent: moment(),
    })
    console.log(message)

    return message
  } catch (err) {
    console.log(err)
    throw new Error('Unable to send message.')
  }
}

const resolver = {
  Mutation: {
    sendMessage,
  },
}

module.exports = resolver
