import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Card.css";
import "../style/LikeDislikeButtons.css";
import { Cookies } from "react-cookie";

export default function Card(props) {
  const cookies = new Cookies();

  const [likeCount, setLikeCount] = useState(props.likes);
  const [dislikeCount, setDislikeCount] = useState(props.dislikes);

  const [activeBtn, setActiveBtn] = useState("none");

  const updateLikesDislikes = async () => {
    const requestOption = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer " + cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fetchID: `${props.myKey}`,
        Likes: `${likeCount}`,
        Dislikes: `${dislikeCount}`,
      }),
    };
    const response = await fetch(
      "https://localhost:7090/drink/likesDislikes/update",
      requestOption
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    console.log(likeCount);
    console.log(dislikeCount);
    updateLikesDislikes();
  }, [likeCount, dislikeCount]);

  const handleClick = (e, action, disaction) => {
    e.preventDefault();
    const isLike = action === "like" && disaction === "dislike";
    const isDislike = action === "dislike" && disaction === "like";

    if (isLike) {
      if (activeBtn === "none") {
        setLikeCount((l) => l + 1);
        setActiveBtn((l) => "like");
      }

      if (activeBtn === "like") {
        setLikeCount((l) => l - 1);
        setActiveBtn((l) => "none");
      }

      if (activeBtn === "dislike") {
        setLikeCount((l) => l + 1);
        setDislikeCount((d) => d - 1);
        setActiveBtn((l) => "like");
      }
    }
    if (isDislike) {
      if (activeBtn === "none") {
        setDislikeCount((d) => d + 1);
        setActiveBtn((l) => "dislike");
      }

      if (activeBtn === "dislike") {
        setDislikeCount((d) => d - 1);
        setActiveBtn((l) => "none");
      }

      if (activeBtn === "like") {
        setDislikeCount((d) => d + 1);
        setLikeCount((l) => l - 1);
        setActiveBtn((l) => "dislike");
      }
    }
  };

  const handleLike = (e) => handleClick(e, "like", "dislike");
  const handleDislike = (e) => handleClick(e, "dislike", "like");

  return (
    <div className="column">
      <div className="card-container">
        <div className="img-container">
          <img src={props.strDrinkThumb} alt=""></img>
        </div>

        <div className="card-content">
          <div className="card-category-name">
            <h3>{props.categoryName}</h3>
          </div>
        </div>

        <div className="card-content">
          <div className="card-title">
            <h3 id={props.myKey}>{props.strDrink}</h3>
          </div>
        </div>
        <div style={{ position: "relative", right: "30px" }}>
          <div className="btn likedislike" style={{ cursor: "default" }}>
            <div className="btn-container like">
              <button
                className={`likedislike ${
                  activeBtn === "like" ? "like-active" : ""
                }`}
                onClick={handleLike}
              >
                <span className="material-symbols-outlined"> thumb_up </span>
                &nbsp;{likeCount}
              </button>
            </div>
            <button style={{ cursor: "pointer" }}>
              <Link
                to={`/categories/${props.categoryName}/${props.strDrink}/${props.myKey}`}
                className="card-button"
                state={{ likes: likeCount, dislikes: dislikeCount }}
              >
                {" "}
                View more{" "}
              </Link>
            </button>
            <div className="btn-container dislike">
              <button
                className={`likedislike ${
                  activeBtn === "dislike" ? "dislike-active" : ""
                }`}
                onClick={handleDislike}
              >
                <span className="material-symbols-outlined"> thumb_down </span>
                &nbsp;{dislikeCount}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
