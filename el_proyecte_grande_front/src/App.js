import './style/App.css';
import Home from './pages/Home'
import Navbar from './pages/Navbar';
import About from './pages/About';
import Categories from './pages/Categories';
import Category from './pages/Category';

import { Route, Routes } from 'react-router-dom'
import Drink from './pages/Drink';
import Register from './pages/Register';
import Login from './pages/Login';
import User from './pages/User';
import AddDrink from './pages/AddDrink';


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
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/user" element={<User />} />
          <Route path="/user" element={<User/>} />
          <Route path="/addDrink" element={<AddDrink/>}></Route>
 
        </Routes>

      </div>
    </>
  )
}

export default App;