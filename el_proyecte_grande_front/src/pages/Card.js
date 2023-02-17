import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import '../style/Card.css'
import '../style/LikeDislikeButtons.css'

export default function Card(props) {

    // const [like, setLike] = useState('');
    // const [disLike, setDisLike] = useState('');

    const [likeCount, setLikeCount] = useState(props.likes);
    const [dislikeCount, setDislikeCount] = useState(props.dislikes);

    const [activeBtn, setActiveBtn] = useState("none");



    const handleLikeClick = () => {
        // if (activeBtn === "none") {
        //     setLikeCount(likeCount + 1);
        //     setActiveBtn("like");
        //     return;
        // }

        // if (activeBtn === 'like') {
        //     setLikeCount(likeCount - 1);
        //     setActiveBtn("none");
        //     return;
        // }

        // if (activeBtn === "dislike") {
        //     setLikeCount(likeCount + 1);
        //     setDislikeCount(dislikeCount - 1);
        //     setActiveBtn("like");
        // }
    };

    const handleDisikeClick = () => {
        // if (activeBtn === "none") {
        //     setDislikeCount(dislikeCount + 1);
        //     setActiveBtn("dislike");
        //     return;
        // }

        // if (activeBtn === 'dislike') {
        //     setDislikeCount(dislikeCount - 1);
        //     setActiveBtn("none");
        //     return;
        // }

        // if (activeBtn === "like") {
        //     setDislikeCount(dislikeCount + 1);
        //     setLikeCount(likeCount - 1);
        //     setActiveBtn("dislike");
        // }
    };


    



    return (
        <div className='column'>
            <div className='card-container' >
                <div className='img-container' >
                    <img src={props.strDrinkThumb} alt=''></img>
                </div>

                <div className='card-content'>
                    <div className='card-category-name'>
                        <h3 >
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
                <div style={{position:'relative',right:'30px'}}>
                <div className='btn likedislike' style={{ cursor: 'default' }}>
                    <div className="btn-container like">
                        <button
                            className={`likedislike ${activeBtn === "like" ? "like-active" : ""}`}
                            onClick={handleLikeClick}
                        >
                            <span className="material-symbols-outlined">thumb_up</span>
                             {likeCount}
                        </button>
                    </div>
                    {/* <div style={{position:'absolute',left:'10px',bottom:'40px'}}><button onClick={() => setLike(1)} style={{position:'absolute',bottom:'-20px'}}>{like}</button></div> */}
                    <button style={{ cursor: 'pointer'  }} >
                        <Link to={`/categories/${props.categoryName}/${props.strDrink}/${props.myKey}`} className='card-button'> View more </Link>
                    </button>
                    <div className='btn-container dislike' >
                        <button 
                            className={`likedislike ${activeBtn === "dislike" ? "dislike-active" : ""}`}
                            onClick={handleDisikeClick}
                        >
                            <span className="material-symbols-outlined">thumb_down</span>
                             {dislikeCount}
                        </button>
                        </div>
                    </div>
                    {/* <div style={{position:'absolute',right:'10px',bottom:'40px'}}><button onClick={() => setDisLike(0)} style={{position:'absolute',bottom:'-20px',right:'0px'}}>{disLike}</button></div> */}

                </div>



            </div>
        </div>


    )
}
