import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {gql, useMutation, } from "@apollo/client";

import { navbarActions } from "../helpers"

const LikeButton = ({ user, post: { id, likes, likeCount } }) => {

    let history = useHistory();

    const [liked, setLiked] = useState(false);
    
    useEffect(() => {
        if (user && likes.find(like => like.userId === user.id)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes])

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
            update(proxy, result) {
            },
            onError(error) {  
            },
            variables: { postId: id }
        }
    )

    const handle_like = () => {
        likePost();
    }

    const handle_like_login = () => {
        history.push("/");
        navbarActions().underline();
    }

    const likeButton = user ? (
            liked ? (
                <button className="postcard-btn" onClick={()=>handle_like()}>
                    <i className="fas fa-heart postcard-btn-icon postcard-btn-icon-active"></i>
                    <p className="postcard-btn-num">{likeCount}</p>
                </button>
            ) : (
                <button className="postcard-btn" onClick={()=>handle_like()}>
                    <i className="far fa-heart postcard-btn-icon"></i>
                    <p className="postcard-btn-num">{likeCount}</p>
                </button>
            )
        ) : (
            <Link to="/login">
                <button className="postcard-btn" onClick={()=>handle_like_login()}>
                    <i className="far fa-heart postcard-btn-icon"></i>
                    <p className="postcard-btn-num">{likeCount}</p>
                </button>
            </Link>
        )

    return likeButton;
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!){
        likePost(postId: $postId){
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

export default LikeButton;