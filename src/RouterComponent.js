import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
export default function RouterComponent() {
  return (
    <div>
        <Router>
      <Routes>
      <Route exact path="/" element={<Login/>} />
      <Route path="/about" element={<Signup/>} />
      <Route path='/navigation' element={<Navigation/>} />
      </Routes>
    </Router>
      
    </div>
  )
}
