import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';

export default function RouterComponent() {
  return (
    <div>
        <Router>
        {/* <nav>
        <ul>
          <li><Link to="/">Loi</Link></li>
          <li><Link to="/about">Signup</Link></li>
        </ul>
      </nav> */}
      <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/about" element={<Signup/>} />
      </Routes>
    </Router>
      
    </div>
  )
}
