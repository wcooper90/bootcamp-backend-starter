const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    login(email: String!, password: String!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
    sendMessage(input: MessageInput!): Message!
    addJournalEntry(text: String!): JournalEntry!
    editJournalEntry(entryId: ID!, text: String!): JournalEntry!
    sendFriendRequest(requesteeId: ID!): Friendship!
    resolveFriendRequest(requestorId: ID!, acceptedOrDeclined: String!): Friendship!
  }

  type Query {
    viewer: User!
    users: [User!]!
    user(id: ID!): User!
    searchUsers(searchText: String!): [User!]!
  }

  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    dob: String!
    friends: [User!]!
    friendRequests: [User!]!
    journalEntries: [JournalEntry!]!
    messagesReceived: [Message!]!
    messagesSent: [Message!]!
  }

  type JournalEntry {
    id: ID!
    userId: User!
    date: String!
    text: String!
  }

  type Message {
    id: ID!
    content: String!
    dateSent: String!
    sender: User!
    receiver: User!
  }

  type Friendship {
    requestorId: ID!
    requesteeId: ID!
  }

  type AuthReturn {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    dob: String!
  }

  input MessageInput {
    content: String!
    senderId: ID!
    receiverId: ID!
  }

`
