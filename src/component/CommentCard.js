import React, { useContext } from 'react';
import moment from "moment";

import { AuthContext } from "../context/auth";
import DeleteButton from './DeleteButton';

const CommentCard = (props) => {
    let postId = props.postId;
    let {id, userId, username, createdAt, body} = props.comment;
    
    const adminId = "5fe59a8218d0de5001587e43";
    const { user } = useContext(AuthContext);

    const handle_like = () => {
        console.log("like_post");
    }

    const handle_comment = () => {
        console.log("comment");
    }

    return (
        <div className="postcard postcard-comment">
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
            <div className="postcard-btns postcard-comment-btns">
                {user && (user.id === userId || user.id === adminId) && (
                    <DeleteButton
                        postId={postId}
                        commentId={id}
                        open_close_modal={props.open_close_modal}
                        isComment={true}
                    />
                )}
            </div>
        </div>
    )
}

export default CommentCard;