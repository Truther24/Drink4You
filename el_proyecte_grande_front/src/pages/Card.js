import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Card.css'

export default function Card(props) {
    return (
        <div className='column'>
        <div className='card-container' >
            <div className='img-container'>
                <img src={props.strDrinkThumb} alt=''></img>
            </div>

            <div className='card-content'>
                <div className='card-title'>
                    <h3 style={{color:'rgba(187, 185, 163, 0.823)'}}>
                        {props.categoryName}
                    </h3>
                </div>
            </div>

            <div className='card-content'>
                <div className='card-title'>
                    <h3 id={props.myKey}>
                        {props.strDrink}
                    </h3>
                </div>
            </div>

            <div className='btn'>
                <button>
                    <Link to={`/categories/${props.categoryName}/${props.strDrink}/${props.myKey}`} className='card-button'> View more </Link>
                </button>
            </div>


        </div>
        </div>
    )
}
