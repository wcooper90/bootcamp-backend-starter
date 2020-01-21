const casual = require('casual')
const userData = require('./user')

casual.define('journalEntry', userId => ({
  id: casual.uuid,
  userId,
  date: casual.date(),
  text: casual.text,
}))


const journalData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  journalData.push(casual.journalEntry(userId))
}

module.exports = journalData
