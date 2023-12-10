import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Switch 대신 Routes를 사용합니다.
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/login'; 
import SignUpForm from './components/pages/SignUpForm'; 

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<Services />} />
          <Route path='/products' element={<Products />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-up-form' element={<SignUpForm />} /> {/* Add the new route */}

          {/* <Route path='/Login' element={<Login />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;