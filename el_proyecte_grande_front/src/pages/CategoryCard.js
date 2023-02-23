import React from 'react'
import { Link } from 'react-router-dom'
import '../style/CategoryCard.css'
import cocktail from '../images/ash-edmonds-fsI-_MRsic0-unsplash.jpg'
import ordinaryDrink from '../images/73461940-44_well-drinks_01-hero.jpg'
import shake from '../images/choco-malt-shake-1024x683.jpg'
import others from '../images/bar101-cocktails-504754220-580e83415f9b58564cf470b9.jpg'
import choco from '../images/15ah-hotchocolate1-mediumSquareAt3X.jpg'
import shot from '../images/219564-2120x1414-line-up-of-shots-on-bar.jpg'
import coffeeAndTea from '../images/what-is-better-tea-or-coffee-XS.jpg'
import liqueur from '../images/04TRIPLESEC1_SPAN-superJumbo.jpg'
import partyDrink from '../images/viring_cocktails_01-11-scaled.jpg'
import beer from '../images/Bier-Cocktail-Pale-Ale-darkrye-com.jpg'
import softDrink from '../images/Vodka-and-Coke-14.jpeg'


export default function CategoryCard(props) {

    const imageUrls = [cocktail, ordinaryDrink,shake,others,choco,shot,coffeeAndTea,liqueur,partyDrink, beer,softDrink]

    return (


        <Link className='categoryCard'
            key={props.categoryIndex}
            to={`/categories/${props.categoryName.replace('/','+')}`}>

            <div className='categoryContainer'>
                <div className='categoryImage' style={{ backgroundImage: `url(${imageUrls[props.categoryIndex]})` }}>

                </div>
                <div key={props.categoryIndex} >
                    <h4 className='categoryText' key={props.categoryIndex+1}>
                        {props.categoryIndex + 1}. {props.categoryName}
                    </h4>
                </div>

            </div>
            <br />
        </Link>
    )
}
