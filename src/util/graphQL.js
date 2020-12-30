import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            userId
            username
            commentCount
            likeCount
            comments {
                id
                userId
                username
                createdAt
                body
            }
            likes {
                id
                userId
                username
                createdAt
            }
        }
    }
`