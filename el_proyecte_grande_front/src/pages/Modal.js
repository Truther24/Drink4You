import React, { useState } from 'react'
import '../style/Modal.css'


export default function Modal() {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (

        <>
            <button className='btn-modal' onClick={toggleModal}>
                Add Comment
            </button>

            {modal && <div className='modal'>
                <div className='overlay' >
                    <div className='modal-content'>
                    <h2>
                        Add your comment down here  
                    </h2>
                    <p>
                        <form>
                        <input type='text'>

                        </input>
                        </form> 
                    </p>

                    <button className='close-modal' onClick={toggleModal}>close</button>
                    </div>
                </div>
            </div>}
            

        </>
    )
}
