import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Modal from "./Modal";

import { FETCH_POSTS_QUERY } from "../util/graphQL";

const DeleteButton = ({ postId, deletePostCallback, isComment, commentId }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    // Create a dynamic mutation variable
    const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION ;

    const [deletePostOrMutation] = useMutation(mutation, {
        update(proxy) {

            // If delete post
            if (!commentId) {
                // Remove from cache once deleted
                const current_data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                })
                let data = { ...current_data };
                data.getPosts = data.getPosts.filter(post => post.id !== postId);
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            };

            // if there is a callback
            if (deletePostCallback) deletePostCallback();
        },
        variables: {
            postId,
            commentId
        }
    });

    return(
        <div>
            <button className={isComment ? `postcard-btn-right postcard-btn-comment` : "postcard-btn-right"} onClick={()=>setConfirmOpen(true)}>
                <i className="fas fa-trash-alt"></i>
            </button>
            {confirmOpen && (
                <Modal 
                    setConfirmOpen={setConfirmOpen}
                    deletePostOrMutation={deletePostOrMutation}
                />
            )}
        </div>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT_MUTATION = gql `
    mutation deleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id username createdAt body
            }
            commentCount
        }
    }
`

export default DeleteButton;