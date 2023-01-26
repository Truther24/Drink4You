import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../style/Drink.css'


export default function Drink() {

    //    const {categoty}  = useParams();
    //    const {drinkName} = useParams();
    const { drinkId } = useParams();

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetcher = async () => {
            const response = await fetch(`https://localhost:7090/drink/${drinkId}`);
            const responseData = await response.json();
            setData(responseData);

        }
        fetcher();
    }, [])

    console.log(data)

    return (
        <div className='drinkContainer'>
            <br />
            <ul>
                <li>
                    <div className='imageContainer'>
                        <img className='image' src={data.strDrinkThumb} alt=''></img>
                    </div>

                    <div className='textContainer'>
                        <h1> Name : {data.strDrink}</h1>
                        <h3>Glass Type : {data.strGlass}</h3>
                        <h3>Instructions : {data.strInstructions}</h3>
                    </div>
                </li>
            </ul>
        </div>
    )
}
