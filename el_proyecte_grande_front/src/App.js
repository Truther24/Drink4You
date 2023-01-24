
import './App.css';
import Home from './pages/Home'
import Navbar from './Navbar';
import About from './pages/About';
import Categories from './pages/Categories';
import Category from './pages/Category';

import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<Category />} />

          <Route path="/about" element={<About />} />

        </Routes>

      </div>
    </>
  )
}

export default App;
