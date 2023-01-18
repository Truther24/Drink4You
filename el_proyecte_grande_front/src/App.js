
import { Component } from 'react';
import './App.css';
import Home from './pages/Home'
import Navbar from './Navbar';
import About from './pages/About';
import Pricing from './pages/Pricing';

import {Route, Routes} from 'react-router-dom' 

function App() {
  
  return (
    <>
  <Navbar/>
  <div className="container">
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/pricing" element={<Pricing/>}/>

    <Route path="/about" element={<About/>}/>

  </Routes>

  </div>
    </>
  )
}

export default App;
