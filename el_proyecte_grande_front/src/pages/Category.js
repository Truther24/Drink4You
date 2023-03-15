import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card.js";
import LoadingSpinner from "./LoadingSpinner.js";
import "../style/Fullscreen.css";
import { Cookies } from "react-cookie";

export default function Category() {
  const { category } = useParams();

  const cookies = new Cookies();

  const [isLoading, setisLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    setisLoading(true);

    const fetcher = async () => {
      const response = await fetch(
        `https://localhost:7090/categories/${category}`,
        {
          method: "GET",
          credentials: "same-origin",
          headers: {
            Authorization: "Bearer " + cookies.get("userToken"),
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setData(responseData);

      // console.log(responseData);
      setisLoading(false);
    };
    fetcher();
  }, []);

  const  drinkUpdatingFunction = async (serverResponse) => {
    console.log(serverResponse.drinksDatabase[0].favorite);
    setData(
      data?.map((drink) => {
        if (
          parseInt(drink.idDrink, 10) ===
          parseInt(serverResponse.drinksDatabase[0].fetchID, 10)
        ) {
          drink.likes = serverResponse.drinksDatabase[0].likes;
          drink.favorite = serverResponse.drinksDatabase[0].favorite;
        }
        return drink;
      })
    );
  };

  const page = (
    <div>
      <br />
      <h1 style={{ fontSize: 40, color: "rgba(210, 205, 105, 0.89)" }}>
        {category
          .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          .replace("_", " ")
          .replace("_", " ")}
      </h1>

      <br />
      <div id="category-cards">
        {data.map((drink) => {
          return (
            <Card id="one-card"
              likes={drink.likes}
              favorite={drink.favorite}
              strDrinkThumb={drink.strDrinkThumb}
              strDrink={drink.strDrink}
              myKey={drink.idDrink}
              key={drink.idDrink}
              drinkUpdatingFunction={drinkUpdatingFunction}
              categoryName={
                category
                  .replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
                    letter.toUpperCase()
                  )
                  .replace("_", " ")
                  .replace("_", " ") + " recipe"
              }
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="fullscreen">{isLoading ? <LoadingSpinner /> : page}</div>
  );
}
