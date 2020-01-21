/* eslint-disable no-console */
const Friendship = require('../../models/Friendship')

const sendFriendRequest = async (obj, { requesteeId }, { user }) => {
  if (!user) {
    throw new Error('Unauthenticated. Please log in to send a friend request.')
  }

  try {
    const f = await Friendship.query().insertAndFetch({
      requestorId: user.id,
      requesteeId,
      status: 'PENDING',
    })

    return f
  } catch (err) {
    console.log(err)
    throw new Error('Unable to send friend request.')
  }
}

const resolveFriendRequest = async (obj, { requestorId, acceptedOrDeclined }, { user }) => {
  if (!user) {
    throw new Error('Unauthenticated. Please log in to accept a friend request.')
  }

  try {
    const friendship = await Friendship.query().where('requestorId', requestorId).andWhere('requesteeId', user.id)

    const resolvedFriendship = friendship.$query().patchAndFetch({
      status: acceptedOrDeclined, // 'ACCEPTED' || 'DECLINED'
    })

    return resolvedFriendship
  } catch (err) {
    console.log(err)
    throw new Error('Unable to accept friend request.')
  }
}

const resolver = {
  Mutation: {
    sendFriendRequest,
    resolveFriendRequest,
  },
}

module.exports = resolver
