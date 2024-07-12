import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Movies-Details';
import Navbar from './Components/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
  
        <Route path="/details/:category/:id" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
