import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import moment from "moment";

import { AuthContext } from "../context/auth";
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = (props) => {
    let {id, userId, username, createdAt, body, likeCount, commentCount, likes} = props.post;
    
    const adminId = "5fe59a8218d0de5001587e43";
    const { user } = useContext(AuthContext);

    return (
        <div className="postcard">
            <div className="postcard-body">
                <p className="postcard-header">
                    {username}
                </p>
                <p className="postcard-createdAt">
                    {moment(createdAt).fromNow()}
                </p>
                <p className="postcard-content">
                    {body}
                </p>
            </div>
            <div className="postcard-btns">
                <LikeButton
                    user={user}
                    post={{ id, likes, likeCount }}
                />
                {props.comment ? (
                    <Link to={`posts/${id}`}>
                        <button className="postcard-btn">
                            <i className="far fa-comments postcard-btn-icon"></i>
                            <p className="postcard-btn-num">{commentCount}</p>
                        </button>
                    </Link>
                ) : (
                    <button className="postcard-btn">
                        <i className="far fa-comments postcard-btn-icon"></i>
                        <p className="postcard-btn-num">{commentCount}</p>
                    </button>
                )}
                {user && (user.id === userId || user.id === adminId) && (
                    <DeleteButton
                        postId={id}
                        open_close_modal={props.open_close_modal}
                        deletePostCallback={props.deletePostCallback}
                    />
                )}
            </div>
        </div>
    )
}

export default PostCard;