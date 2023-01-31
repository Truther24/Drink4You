import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../style/Drink.css'
import LoadingSpinner from './LoadingSpinner';


export default function Drink() {

    //    const {categoty}  = useParams();
    //    const {drinkName} = useParams();
    const { drinkId } = useParams();

    const [isLoading, setisLoading] = useState(false);


    const [data, setData] = useState([]);
    useEffect(() => {
        setisLoading(true)

        const fetcher = async () => {
            const response = await fetch(`https://localhost:7090/drink/${drinkId}`);
            const responseData = await response.json();
            setData(responseData);
            setisLoading(false)


        }
        fetcher();
    }, [])

    console.log(data)

    return (
        <div className='drinkContainer'>
            <br />
            
                    <div className='imageContainer'>
                        <img className='image' src={data.strDrinkThumb} alt=''></img>
                    </div>

                    <div className='textContainer'>
                        <h1 className='nameContainer'> Name : {data.strDrink}</h1>
                        <h3 className='glassContainer'>Glass Type : {data.strGlass}</h3>
                        <h3 className='instructionsContainer'>Instructions : {data.strInstructions}</h3>
                        <div className='ingredientsContainer'> Ingredients: 
                            <li>
                                <ul> {data.strIngredient1} </ul>
                                <ul> {data.strIngredient2} </ul>
                                <ul> {data.strIngredient3} </ul>
                                <ul> {data.strIngredient4} </ul>
                            </li>
                        </div>
                    </div>
               
        </div>
    )
}
