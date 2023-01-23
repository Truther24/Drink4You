import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


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
        <div>
            <ul>
                <li>
                    <h1> Name : {data.strDrink}</h1>
                    <h3>Glass Type : {data.strGlass}</h3>
                    <h3>Instructions : {data.strInstructions}</h3>
                </li>
            </ul>
        </div>
    )
}
