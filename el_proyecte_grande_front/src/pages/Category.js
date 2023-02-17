import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card.js';
import LoadingSpinner from './LoadingSpinner.js';
import '../style/Fullscreen.css'
import { Cookies } from 'react-cookie';


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
      setDrinTable(result);
    }
    likesFetcher();
  }, []);
  // console.log(drinkTable)



  useEffect(() => {
    setisLoading(true)

    const fetcher = async () => {
      const requestOption = {
        method: "GET",
        credentials: 'same-origin',
        headers: {
          'Authorization': 'Bearer ' + cookies.get('userToken'),
          "Content-Type": "application/json"
        }
      }
      const response = await fetch(`https://localhost:7090/categories/${category}`, requestOption);
      const responseData = await response.json();

      setData(responseData.map(fetchedDrink => {
        if (drinkTable.map(savedDrinks => savedDrinks.fetchID).includes(fetchedDrink.idDrink)) {
          console.log("went in if")
          fetchedDrink.likes = drinkTable.find(savedDrinks => savedDrinks.fetchID === fetchedDrink.idDrink)?.likes;
          fetchedDrink.dislikes = drinkTable.find(savedDrinks => savedDrinks.fetchID === fetchedDrink.idDrink)?.dislikes;
        }

        return fetchedDrink;
      }));
      setisLoading(false)


    }
    fetcher();
  }, [])

  console.log({ data, drinkTable })


  //dataa -- api
  // drinkTable -- baza de date

  // console.log(data[2]);
  // console.log(data)
  // console.log(data[2]?.idDrink)
  // console.log(drinkTable.find(drink=>drink.fetchID=="15300"));

  // var matchedDrinks;

  // for (let i = 0; i < data?.length; i++) {
  //   if (data[i]?.idDrink === drinkTable?.find(drink => drink?.fetchID === data[i]?.idDrink)) {
  //     console.log("in if")
  //     // matchedDrinks.add(drinkTable.find(drink=>drink.fetchID==data[i].idDrink))
  //     var matchedDrinks = drinkTable.find(drink => drink.fetchID == data[i].idDrink)
  //     console.log(matchedDrinks)

  //     if (matchedDrinks[i].likes) {
  //       data[i].likes = matchedDrinks[i].likes
  //       data[i].dislikes = matchedDrinks[i].dislikes
  //     }
  //     else {
  //       data[i].Likes = 0
  //       data[i].Dislikes = 0
  //     }
  //   }
  // }

  // console.log(data)


  const page = (
    <div>
      <br />
      <h1 style={{ fontSize: 40, color: 'rgba(210, 205, 105, 0.89)' }} >
        {category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("_", " ").replace("_", " ")}
      </h1>

      <br />



      {data.map((drink) => {
        return (

          <Card
            likes={drink.likes}
            dislikes={drink.dislikes}
            strDrinkThumb=
            {drink.strDrinkThumb}
            strDrink={drink.strDrink}
            myKey={drink.idDrink}
            key={drink.idDrink}
            categoryName={category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("_", " ").replace("_", " ") + " recipe"} />
        )


      })}


    </div>
  )

  return (
    <div
      className='fullscreen'>
      {isLoading ? <LoadingSpinner /> : page}
    </div>
  )
}