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
  useEffect(() => {
    setisLoading(true)

    const fetcher = async () => {
      const requestOption = {
        method: "GET",
        credentials: 'same-origin',
        headers: {
          'Authorization': 'Bearer ' + cookies.get('userToken'),
          "Content-Type": "application/json"
        }}
      const response = await fetch(`https://localhost:7090/categories/${category}`, requestOption);
      const responseData = await response.json();
      setData(responseData);
      setisLoading(false)


    }
    fetcher();
  }, [])


  console.log(data)

  const page = (
    <div>
      <br/>
      <h1 style={{fontSize:40 , color: 'rgba(210, 205, 105, 0.89)' }} >
        {category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("_", " ").replace("_", " ") }
      </h1>

         <br />
      {data.map((drink) => {
        return (
          

          <Card strDrinkThumb=
          {drink.strDrinkThumb} 
          strDrink={drink.strDrink}   
          myKey={drink.idDrink}  
          key={drink.idDrink} 
          categoryName={category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace("_", " ").replace("_", " ")+ " recipe"} />
          )
          
      
        })} 
        
        
    </div>
  )

  return (
    <div 
    className='fullscreen'>
         {isLoading ? <LoadingSpinner/> : page}
         </div>
      )
}