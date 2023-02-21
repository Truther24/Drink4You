import React, { useEffect, useState, useRef } from "react";
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
  const [drinkTable, setDrinTable] = useState([]);

  useEffect(() => {
    const likesFetcher = async () => {
      let request = await fetch(`https://localhost:7090/drink/likesDislikes`);
      let result = await request.json();
      console.log(result)
      setDrinTable(result);
    };
    likesFetcher();
  }, []);

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

      if (responseData?.length && drinkTable?.length) {
        setData(
          responseData.map((fetchedDrink) => {
            const finder = (savedDrinks) =>
              savedDrinks.fetchID === fetchedDrink.idDrink;

            if (
              drinkTable
                .map((savedDrinks) => savedDrinks.fetchID)
                .includes(fetchedDrink.idDrink)
            ) {
              fetchedDrink.likes = drinkTable.find(finder)?.likes;
              fetchedDrink.dislikes = drinkTable.find(finder)?.dislikes;
            }

            return fetchedDrink;
          })
        );
      }
      setisLoading(false);
    };
    fetcher();
  }, [drinkTable]);

  console.log(data[0])
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
      {data.map((drink) => {
        return (
          <Card
            likes={drink.likes}
            dislikes={drink.dislikes}
            strDrinkThumb={drink.strDrinkThumb}
            strDrink={drink.strDrink}
            myKey={drink.idDrink}
            key={drink.idDrink}
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
  );

  return (
    <div className="fullscreen">{isLoading ? <LoadingSpinner /> : page}</div>
  );
}
