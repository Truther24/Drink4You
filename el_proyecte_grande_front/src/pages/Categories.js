import { useEffect, useState } from "react";
import CategoryCard from "../CategoryCard"

export default function Categories() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchGet = async () => {
            const response = await fetch("https://localhost:7090/categories");
            const data = await response.json();
            console.log(data)
            setCategories(data?.drinks)

        }
        fetchGet();
    }, [])

    

    return (

        <div style={{backgroundColor: 'black'}}>
            <br/>
            <h1>

            Categories
            
            </h1>
            <br/>
            {categories.map((category, index) => {
                return (

                    <CategoryCard categoryIndex= {index} categoryName= {category.StrCategory}/>
                    
                )
            })}

        </div>)
}