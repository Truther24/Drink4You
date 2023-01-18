import { useEffect, useState } from "react";

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

        <div>
            <h1>

            Categories
            
            </h1>
            <br/>
            {categories.map((category, index) => {
                return (
                    <div key={index}>
                        <h4>
                            {index+1}. {category.StrCategory}
                        </h4>
                    </div>
                )
            })}

        </div>)
}