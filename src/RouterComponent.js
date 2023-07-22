import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import About from './components/About';
import Profile from './components/Profile';
import Home from './components/Home'
export default function RouterComponent() {
  return (
    <div>
      <Router>
      <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path='/' element={<><Navigation/><Home/></>} />
      <Route path='/about' element={<><Navigation/><About/></>}/>
      <Route path='/profile' element={<><Navigation/><Profile/></>}/>
      </Routes>
    </Router>
      
    </div>
  )
}
