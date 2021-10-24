const { gql } = require('apollo-server-express')

const typeDefs = gql`

    type User {
        username: String
        email: String
        password: String
        savedBooks: [Book]
    }

    type Book {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user(userId: ID!):User
    }

    type Mutation {
        addUser(username: String!, email: String, password: String): User
        login(email: String!, password: String!): Auth
        addBook(userId: ID!, authors: [String], description: String, bookId: String!, image: String!, link: String, title: String): Book
        removeBook(userId: ID!, bookId: String!): Book
    }
`;

module.exports = typeDefs;