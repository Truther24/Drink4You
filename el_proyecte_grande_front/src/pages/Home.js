import cocktail from '../ash-edmonds-fsI-_MRsic0-unsplash.jpg'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>

            <div style={{ backgroundImage: `url(${cocktail})`, width: '100%',
    height: '100%',
    display: 'block',
    backgroundRepeat : 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition : 'center',
    opacity: 0.9}}>
        <div style={{color:"white", fontSize: 26}}>
      <h1 >Welcome to Drink4You main page!</h1>
    <h3>Check all the drink categories we got for you </h3>
    <Link to="/categories">Drink categories</Link>
    </div>
    </div>
        </>
    )
}