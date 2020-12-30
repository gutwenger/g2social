import React, { useState, useContext } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

import PostCard from "../component/PostCard";
import CommentCard from "../component/CommentCard";
import { AuthContext } from "../context/auth";

const SinglePost = (props) => {

    const { user } = useContext(AuthContext);

    const [comment, setComment] = useState('');

    const postId = props.match.params.postId;

    const { data, loading } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    })

    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
        },
        variables: {
            postId,
            body: comment
        }
    })

    // deletePost
    function deletePostCallback() {
        props.history.push("/");
    }

    // DOM content to be returned
    let postMarkup;

    // If not finish loading
    if (!data) {
        postMarkup = <p>Loading post...</p>
    } else {
        //const { id, userId, username, createdAt, body, likeCount, commentCount, likes, comments } = data.getPost;
        const post = data.getPost;

        postMarkup = (
            <div className="container">
                <div className="singlePost">
                    {loading 
                        ? <h1>Loading...</h1>
                        : (
                            <PostCard 
                                key={post.id}
                                post={post}
                                comment={false}
                                deletePostCallback={deletePostCallback}
                            />
                        )
                    }
                    {user && (
                        <div className="singlePost-comment">
                            <p className="singlePost-comment-title">Post a comment</p>
                            <form className="singlePost-comment-form" onSubmit={event=>event.preventDefault()}>
                                <input
                                    className="singlePost-comment-input"
                                    type="text"
                                    placeholder="Comment..."
                                    name="comment"
                                    value={comment}
                                    autoComplete="off"
                                    onChange={event => setComment(event.target.value)}
                                />
                                <button 
                                    className="singlePost-comment-submit"
                                    disabled={comment.trim() === ""}
                                    onClick={()=>submitComment()}
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    )}
                    {loading 
                        ? <h1>Loading...</h1>
                        : post.comments.map(comment => (
                                <CommentCard 
                                    key={comment.id}
                                    postId={post.id}
                                    comment={comment}
                                    deletePostCallback={deletePostCallback}
                                />
                            ))
                    }
                </div>
            </div>
        )
    }

    return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id userId username createdAt body
            }
            commentCount
        }
    }
`;


const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id userId username createdAt body likeCount commentCount
            likes {
                userId
            }
            comments {
                id
                userId
                username
                createdAt
                body
            }
        }
    }

`;

export default SinglePost;