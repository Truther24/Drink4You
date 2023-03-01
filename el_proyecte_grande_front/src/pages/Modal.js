import React, { useState } from "react";
import "../style/Modal.css";

export default function Modal(props) {
    const [modal, setModal] = useState(false);


    const toggleModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <button id="button" className="btn-modal" onClick={toggleModal}>
                Add Comment
            </button>

            {modal && (
                <div className="modal">
                    <div className="overlay" onClick={toggleModal}></div>
                    <div className="modal-content">
                        <br />
                        <br />
                        <h2 id="add-comment-text">
                            Add your comment down here
                        </h2>
                        <form
                            id="p"
                            onSubmit={(e) => {
                                props.addComment(e);
                                toggleModal();
                            }}
                        >
                            <textarea
                                id="comment"
                                name="comment"
                                rows="10"
                                cols="40"
                                required
                            ></textarea>
                            <br />
                            <br />
                            <button type="submit">Add</button>
                        </form>
                        <button
                            id="close-button"
                            className="close-modal"
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
