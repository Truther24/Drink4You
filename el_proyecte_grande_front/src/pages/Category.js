import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../Card';

export default function Category() {

  const { category } = useParams();

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(`https://localhost:7090/categories/${category}`);
      const responseData = await response.json();
      setData(responseData);

    }
    fetcher();
  }, [])

  console.log(data)

  return (
    <div>
      <h1 style={{fontSize:40 , color:'blue'}} >
        {category }
      </h1>

         <br />
      {data.map((drink) => {
        return (
          
          <Card strDrinkThumb={drink.strDrinkThumb} strDrink={drink.strDrink} myKey={drink.idDrink}  key={drink.idDrink} categoryName={category} />
          )
          
      
        })} 
        
        </div>)
}