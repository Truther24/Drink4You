import React, { useState } from "react";
import "../style/Modal.css";
import { Cookies } from "react-cookie";

export default function Modal(props) {
    const [modal, setModal] = useState(false);

    const cookies = new Cookies();

    // async function addComment(event) {
    //     event.preventDefault();
    //     alert(event.target.comment.value);

    //     const requestOption = {
    //         method: "POST",
    //         credentials: "same-origin",
    //         headers: {
    //             Authorization: "Bearer " + cookies.get("userToken"),
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             idDrink: `${props.drinkId}`,
    //             message: `${event.target.comment.value}`,
    //         }),
    //     };

    //     const response = await fetch(
    //         `https://localhost:7090/postComment`,
    //         requestOption
    //     );
    //     const responseData = await response.json();
    //     console.log(responseData);
    // }

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
                                rows="30"
                                cols="5"
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
