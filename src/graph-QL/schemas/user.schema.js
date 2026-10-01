const userSchema = `#graphql

type UserOption {
  id: ID!
  name: String!
}

type UserCard {
  id: ID!
  name: String!
  email: String!
  role: String
  status: String
}

type Query {
  userOptions: [UserOption!]!
  userCards: [UserCard!]!
}

`;

export default userSchema;