import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard"
import LoadingSpinner from "./LoadingSpinner";
import '../style/Fullscreen.css'
import { Cookies } from "react-cookie";

export default function Categories() {

const cookies = new Cookies();

    const [categories, setCategories] = useState([]);

    const [isLoading, setisLoading] = useState(false);

    useEffect(() => {

        console.log(cookies.get('userToken'))
        setisLoading(true)
        const fetchGet = async () => {
            const requestOption = {
                method: "GET",
                credentials: 'same-origin',
                headers: {
                  'Authorization': 'Bearer ' + cookies.get('userToken'),
                  "Content-Type": "application/json"
                }}
            const response = await fetch("https://localhost:7090/categories", requestOption);
            const data = await response.json();
            console.log(data)
            setCategories(data?.drinks)
            setisLoading(false)
        }
        fetchGet();
    }, [])

    const page = (
        <div>
            <br/>
            <h1 className="title">

                Categories

            </h1>
            <br />
            {categories.map((category, index) => {
                return (

                    <CategoryCard categoryIndex={index} key={index} categoryName={category.StrCategory} />

                )
            })}
        </div>
    )

    const checkCookies = () => {
        
    }

    return (

        <div className="fullscreen">
            {isLoading ? <LoadingSpinner/> : page}
            <br />


        </div>)
}