import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard"
import LoadingSpinner from "./LoadingSpinner";
import '../style/Fullscreen.css'

export default function Categories() {

    const [categories, setCategories] = useState([]);

    const [isLoading, setisLoading] = useState(false);




    useEffect(() => {


        setisLoading(true)
        const fetchGet = async () => {
            const response = await fetch("https://localhost:7090/categories");
            const data = await response.json();
            console.log(data)
            setCategories(data?.drinks)
            setisLoading(false)
        }
        fetchGet();
    }, [])

    const page = (
        <div>
            <h1>

                Categories

            </h1>
            <br />
            {categories.map((category, index) => {
                return (

                    <CategoryCard categoryIndex={index} categoryName={category.StrCategory} />

                )
            })}
        </div>
    )

    return (

        <div className="fullscreen">
            {isLoading ? <LoadingSpinner/> : page}
            <br />


        </div>)
}