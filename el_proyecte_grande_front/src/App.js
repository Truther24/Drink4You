import './style/App.css';
import Home from './pages/Home'
import Navbar from './pages/Navbar';
import About from './pages/About';
import Categories from './pages/Categories';
import Category from './pages/Category';

import { Route, Routes } from 'react-router-dom'
import Drink from './pages/Drink';

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <br/>
        <br/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Category />} />
          <Route path="/categories/:category/:drinkName/:drinkId" element={<Drink />} />
          <Route path="/about" element={<About />} />
 
        </Routes>

      </div>
    </>
  )
}

export default App;