import React from "react";

const Modal = ({ setConfirmOpen, deletePostOrMutation }) => {

    return(
        <div className="confirm-delete">
            <div className="confirm-delete-overlay">
                <div className="confirm-delete-box">
                    <p className="confirm-delete-box-p">Are you sure?</p>
                    <div className="confirm-delete-box-btns">
                        <button className="confirm-delete-box-btn" onClick={()=>setConfirmOpen(false)}><i className="fas fa-undo-alt"></i></button>
                        <button className="confirm-delete-box-btn confirm-delete-box-btn-delete" onClick={()=>deletePostOrMutation()}><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;