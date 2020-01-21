/* eslint-disable no-console */
const User = require('../../models/User')
const JournalEntry = require('../../models/JournalEntry')
const Message = require('../../models/Message')

const viewer = async (obj, args, { user }) => {
  if (user) return user

  throw new Error('Unauthenticated. Please login to access CheerMeUp.')
}

const userResolver = async (obj, { userId }) => {
  try {
    const u = await User.query().findById(userId)

    return u
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch user by id.')
  }
}

const users = async () => {
  try {
    const u = await User.query()

    return u
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch all users.')
  }
}

const searchUsers = async (obj, { searchText }, { user }) => {
  if (!user) {
    throw new Error('Unauthenticated. Please login to access CheerMeUp.')
  }

  try {
    const u = await User.query().where('firstName', 'like', `%${searchText}%`).orWhere('lastName', 'like', `%${searchText}%`)
    return u
  } catch (err) {
    console.log(err)
    throw new Error('Unable to search users.')
  }
}

const friends = async ({ userId }) => {
  try {
    const allFriends = await User.query().whereExists(
      User.relatedQuery('requestedFriend')
        .where('requestorId', userId)
        .andWhere('status', 'ACCEPTED'),
    ).orWhereExists(
      User.relatedQuery('requestingFriend')
        .where('requesteeId', userId)
        .andWhere('status', 'ACCEPTED'),
    )

    return allFriends
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch friends.')
  }
}

const friendRequests = async ({ userId }) => {
  try {
    const r = await User.query().whereExists(
      User.relatedQuery('requestingFriend')
        .where('requesteeId', userId)
        .andWhere('status', 'PENDING'),
    )

    return r
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch friend requests.')
  }
}

const journalEntries = async ({ userId }) => {
  try {
    const j = await JournalEntry.query().where('userId', userId)

    return j
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch journal entries.')
  }
}

const messagesSent = async ({ userId }) => {
  try {
    const m = await Message.query().where('senderId', userId)

    return m
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch messages.')
  }
}

const messagesReceived = async ({ userId }) => {
  try {
    const m = await Message.query().where('receiverId', userId)

    return m
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch messages.')
  }
}

const resolver = {
  Query: {
    viewer,
    user: userResolver,
    users,
    searchUsers,
  },
  User: {
    friends,
    friendRequests,
    journalEntries,
    messagesSent,
    messagesReceived,
  },
}

module.exports = resolver
