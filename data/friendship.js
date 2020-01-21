const casual = require('casual')
const userData = require('./user')

const statusArray = ['ACCEPTED', 'PENDING', 'DECLINED']


casual.define('friendship', (requestorId, requesteeId, status) => ({
  id: casual.uuid,
  requestorId,
  requesteeId,
  status,
}))


const friendshipData = []

for (let i = 0; i < 20; ++i) {
  const requestorId = casual.random_element(userData).id
  const requesteeId = casual.random_element(userData).id
  const status = statusArray[casual.integer(0, 2)]
  friendshipData.push(casual.friendship(requestorId, requesteeId, status))
}

module.exports = friendshipData
