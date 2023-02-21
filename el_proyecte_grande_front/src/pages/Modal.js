import React, { useState } from "react";
import "../style/Modal.css";

export default function Modal() {
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
            <h2 id="h2">Add your comment down here</h2>
            <p id="p">
              <form>
                <input type="text"></input>
              </form>
            </p>

            <button id="button" className="close-modal" onClick={toggleModal}>
              close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
