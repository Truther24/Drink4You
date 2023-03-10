import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/Card.css";
import "../style/LikeDislikeButtons.css";
import { Cookies } from "react-cookie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Favorite } from "@material-ui/icons";

export default function Card(props) {
  const cookies = new Cookies();

  // const [likeCount, setLikeCount] = useState(props.likes);
  // const [dislikeCount, setDislikeCount] = useState(props.dislikes);

  const [activeBtn, setActiveBtn] = useState("none");

  const favorite = <FavoriteIcon />;
  const favoriteBorder = <FavoriteBorderIcon />;

  const [fav, setFav] = useState(favoriteBorder);

  const DrinkName = ({ drinkName }) => {
    if (drinkName.length >= 24) {
      console.log(`This drink name is too long! : ${drinkName}`);
      return <h3 id={props.myKey}>{drinkName}</h3>;
    }
    return (
      <>
        <h3 id={props.myKey}>{drinkName}</h3>
        <h3>&nbsp;</h3>
      </>
    );
  };

  const updateLikesDislikes = async (obj) => {
    const requestOption = {
      method: "PUT",
      credentials: "same-origin",
      headers: {
        Authorization: "Bearer " + cookies.get("userToken"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fetchID: props.myKey,
        Likes: obj.likes,
        Favorite: obj.favorite,
      }),
    };
    const response = await fetch(
      "https://localhost:7090/drink/likesDislikes/update",
      requestOption
    );
    const data = await response.json();
    props.drinkUpdatingFunction(data);
    // console.log(data);
  };

  useEffect(() => {
    if (props.favorite === true) {
      setFav(favorite);
    } else {
      setFav(favoriteBorder);
    }
  }, []);

  const handleClick = (e, action) => {
    e.preventDefault();

    let like = props.likes;
    let favoriteBool = props.favorite;
    if (action == "like") {
      if (activeBtn === "none") {
        like++;
        setActiveBtn((l) => "like");
      } else if (activeBtn === "like") {
        like--;
        setActiveBtn((l) => "none");
      }
    } else if (action == "favorite") {
      // console.log(favoriteBool)
      if (favoriteBool == false) {
        favoriteBool = true;
        setFav(favorite);
      } else {
        favoriteBool = false;
        setFav(favoriteBorder);
      }
    }
    updateLikesDislikes({
      likes: like,
      favorite: favoriteBool,
    });
  };

  const handleLike = (e) => handleClick(e, "like");
  const handleFavorite = (e) => handleClick(e, "favorite");

  return (
    <div className="column">
      <div className="card-container">
        <div className="img-container">
          <img id="card-image" src={props.strDrinkThumb} alt=""></img>
        </div>

        <div className="card-content">
          <div className="card-category-name">
            <h3>{props.categoryName}</h3>
          </div>
        </div>

        <div className="card-content">
          <div className="card-title">
            <DrinkName drinkName={props.strDrink} />
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
                &nbsp;{props.likes}
              </button>
            </div>
            <button style={{ cursor: "pointer" }}>
              <Link
                to={`/categories/${props.categoryName}/${props.strDrink.replace(
                  "/",
                  "+"
                )}/${props.myKey}`}
                className="card-button"
                state={{ likes: props.likes, dislikes: props.dislikes }}
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
                onClick={handleFavorite}
              >
                <span> {fav} </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
