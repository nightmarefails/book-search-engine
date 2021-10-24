import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String, $password: String) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
   }
`

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($userId: ID!, $authors: [String], $description: String, $bookId: String!, $image: String!, $link: String, $title: String) {
        addBook(userId: $userId, authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
            bookId
            title
            description
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($userId: ID!, $bookId: String!) {
        removeBook(userId: $userId, bookId: $bookId) {
            bookId
            title
            description
        }
    }
`