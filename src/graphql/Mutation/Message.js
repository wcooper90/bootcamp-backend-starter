/* eslint-disable no-console */
const Message = require('../../models/Message')

const sendMessage = async (obj, {
  input: {
    content, senderId, receiverId, createdAt,
  },
}) => {
  try {
    const message = await Message.query().insertAndFetch({
      content,
      senderId,
      receiverId,
      createdAt,
    })

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
