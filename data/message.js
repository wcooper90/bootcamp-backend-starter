const casual = require('casual')
const userData = require('./user')

casual.define('message', (senderId, receiverId) => ({
  id: casual.uuid,
  senderId,
  receiverId,
  dateSent: casual.date(),
  content: casual.text,
}))


const messageData = []

for (let i = 0; i < 20; ++i) {
  const senderId = casual.random_element(userData).id
  const receiverId = casual.random_element(userData).id
  messageData.push(casual.message(senderId, receiverId))
}

module.exports = messageData
