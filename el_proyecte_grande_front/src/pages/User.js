import React, { Component } from 'react'
import '../style/User.css';

export class User extends Component {
    render() {
        return (
            <>
            <div className='last'>
                <div className='baseCard'>

                <div className='card'>
                    <div className='row'>
                        <div className='colKey'>
                            <p className='KeyText'>
                                Full Name
                            </p>
                        </div>
                        <div className='colValue'>
                            <p className='valueText'>
                                pohui
                            </p>
                        </div>
                    </div>
                    <hr></hr>
                    <br></br>
                    <div className='row'>
                        <div className='colKey'>
                            <p className='KeyText'>
                                email
                            </p>
                        </div>
                        <div className='colValue'>
                            <p className='valueText'>
                                email
                            </p>
                        </div>
                    </div>
                    <hr/>

                </div>
                </div>
                </div>

            </>
        )
    }
}

export default User