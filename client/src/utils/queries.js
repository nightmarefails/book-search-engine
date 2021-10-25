import { gql } from '@apollo/client'

export const QUERY_USER = gql`
    query user {
        user {
            _id
            username
            email
            savedBooks {
                authors
                description
                bookId
                image
                link
                title
            }
        }
    }
`
