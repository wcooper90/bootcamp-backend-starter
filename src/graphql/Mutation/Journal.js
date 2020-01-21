/* eslint-disable no-console */
const moment = require('moment')

const JournalEntry = require('../../models/JournalEntry')

const addJournalEntry = async (obj, { text }, { user }) => {
  if (!user) {
    throw new Error('Unauthenticated. Please log in to add a journal entry.')
  }

  try {
    const j = await JournalEntry.query().insertAndFetch({
      text,
      userId: user.id,
      date: moment().format('YYYY-MM-DD'),
    })

    return j
  } catch (err) {
    console.log(err)
    throw new Error('Unable to add journal entry.')
  }
}

const editJournalEntry = async (obj, { entryId, text }, { user }) => {
  if (!user) {
    throw new Error('Unauthenticated. Please log in to add a journal entry.')
  }

  try {
    const j = await JournalEntry.query().patchAndFetchById(entryId, {
      text,
    })

    return j
  } catch (err) {
    console.log(err)
    throw new Error('Unable to add journal entry.')
  }
}

const resolver = {
  Mutation: {
    addJournalEntry,
    editJournalEntry,
  },
}

module.exports = resolver
