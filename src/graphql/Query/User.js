/* eslint-disable no-console */
const User = require('../../models/User')
const JournalEntry = require('../../models/JournalEntry')
const Message = require('../../models/Message')

const viewer = async (obj, args, { user }) => {
  console.log(user)
  if (user) return user

  throw new Error('Unauthenticated. Please login to access CheerMeUp.')
}

const userResolver = async (obj, { id }) => {
  try {
    const u = await User.query().findById(id)

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
  // Note: comment out this error check if user auth has not been set up yet
  if (!user) {
    throw new Error('Unauthenticated. Please login to access CheerMeUp.')
  }

  try {
    const u = await User.query().where('firstName', 'ilike', `%${searchText}%`).orWhere('lastName', 'ilike', `%${searchText}%`)
    return u
  } catch (err) {
    console.log(err)
    throw new Error('Unable to search users.')
  }
}

const friends = async ({ id }) => {
  try {
    const allFriends = await User.query().whereExists(
      User.relatedQuery('requestingFriend')
        .where('requestorId', id)
        .andWhere('status', 'ACCEPTED'),
    ).orWhereExists(
      User.relatedQuery('requestedFriend')
        .where('requesteeId', id)
        .andWhere('status', 'ACCEPTED'),
    )

    return allFriends
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch friends.')
  }
}

const friendRequests = async ({ id }) => {
  try {
    const r = await User.query().whereExists(
      User.relatedQuery('requestedFriend')
        .where('requesteeId', id)
        .andWhere('status', 'PENDING'),
    )

    return r
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch friend requests.')
  }
}

const journalEntries = async ({ id }) => {
  try {
    const j = await JournalEntry.query().where('userId', id)

    return j
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch journal entries.')
  }
}

const messagesSent = async ({ id }) => {
  try {
    const m = await Message.query().where('senderId', id)

    return m
  } catch (err) {
    console.log(err)
    throw new Error('Unable to fetch messages.')
  }
}

const messagesReceived = async ({ id }) => {
  try {
    const m = await Message.query().where('receiverId', id)

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

// Example query

// query ($id: ID!) {
//   user(id: $id) {
//     firstName
//     lastName
//     dob
//     email
//     friends {
//       firstName
//       lastName
//       email
//     }
//     friendRequests {
//       firstName
//       lastName
//       email
//     }
//     journalEntries {
//       date
//       text
//     }
//     messagesSent {
//       content
//     }
//     messagesReceived {
//       content
//     }
//   }
// }
