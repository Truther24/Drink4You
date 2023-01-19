import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Category() {

    const {category } = useParams();
    
    const [data, setData] = useState([]);
    useEffect(()=> {
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
      <h1 >
        {category}

        
      </h1>
    </div>
  )
}


