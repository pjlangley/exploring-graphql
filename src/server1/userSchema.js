const { gql } = require('apollo-server');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const uuid = require('uuid/v4');

const { users, userFriends } = require('./fakeStore');

const typeDefs = gql`
  type Friends {
    id: ID
    name: String
  }
  
  enum CountryCode {
    UK
    USA
  }
  
  scalar Date

  type User {
    id: ID
    name: String
    friends: [Friends!]!
    location(countryCode: CountryCode): CountryCode
    registered: Date
  }

  type Query {
    user(id: ID!): User
    users(countryCode: CountryCode): [User]
  }

  type Mutation {
    addUser(name: String!, location: CountryCode!): User
  }
`;

// Resolvers can be used to make network requests for the data etc.
const resolvers = {
  Query: {
    user(parent, args, context, info) {
      return users.find(user => user.id === args.id);
    },
    users(parent, args, context, info) {
      if (args.countryCode) {
        return users.filter(user => user.location === args.countryCode);
      }
      return users;
    }
  },
  User: {
    friends(user) {
      return userFriends
        .find(friends => friends.userId === user.id)
        .userFriendIds
        .map(userId => users.find(u => u.id === userId));
    }
  },
  Mutation: {
    addUser(parent, args, context, info) {
      const { name, location } = args;
      const id = uuid();

      users.push({ id, name, location, registered: new Date() });
      userFriends.push({ userId: id, userFriendIds: [] })

      return users.find(user => user.id === id);
    }
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'The `Date` scalar type represents a date timestamp, e.g. `1562847803200`.',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    }
  })
};

module.exports = {
  typeDefs,
  resolvers
};
