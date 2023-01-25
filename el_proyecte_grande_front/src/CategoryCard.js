import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './CategoryCard.css'
import cocktail from './ash-edmonds-fsI-_MRsic0-unsplash.jpg'
import ordinaryDrink from './73461940-44_well-drinks_01-hero.jpg'
import shake from './choco-malt-shake-1024x683.jpg'
import others from './bar101-cocktails-504754220-580e83415f9b58564cf470b9.jpg'
import choco from './15ah-hotchocolate1-mediumSquareAt3X.jpg'
import shot from './219564-2120x1414-line-up-of-shots-on-bar.jpg'
import coffeeAndTea from './what-is-better-tea-or-coffee-XS.jpg'
import liqueur from './04TRIPLESEC1_SPAN-superJumbo.jpg'
import partyDrink from './viring_cocktails_01-11-scaled.jpg'
import beer from './Bier-Cocktail-Pale-Ale-darkrye-com.jpg'
import softDrink from './Vodka-and-Coke-14.jpeg'


export default function CategoryCard(props) {

    const imageUrls = [cocktail, ordinaryDrink,shake,others,choco,shot,coffeeAndTea,liqueur,partyDrink, beer,softDrink]
    let imageAmount = imageUrls.length;

    const [count, setCount] = useState(-1);

    function incrementCount() {
        if (count == 2) {
            setCount(0)
        }
        else {

            setCount(prevCount => prevCount + 1)
        }
    }

    useEffect(() => {

        incrementCount()

    }, [])


    console.log(cocktail)


    return (


        <Link className='categoryCard'
            key={props.categoryIndex}
            to={`/categories/${props.categoryName.toLowerCase().replace(" / ", "_").replace(" ", "_") + "s"}`}>

            <div className='categoryContainer'>
                <div className='categoryImage' style={{ backgroundImage: `url(${imageUrls[props.categoryIndex]})` }}>

                </div>
                <div key={props.categoryIndex} >
                    <h4 className='categoryText'>
                        {props.categoryIndex + 1}. {props.categoryName}
                    </h4>
                </div>

            </div>
            <br />
        </Link>
    )
}
