import React from 'react'
import './style/Navigation.css'
import { BiLogIn } from "react-icons/bi";
import { Link } from 'react-router-dom';


// BiLogIn
export default function Navigation() {
  return (
    <div>
      <div className='container-nav'>
        <nav>
            <ul className='left-nav-list'>
            <Link to={'/'}><li>Home</li> </Link>
            <Link to={'/about'}><li>About</li></Link>
            <Link to={'/profile'}><li>Profile</li></Link>
                <div className='right-nav-list'>
                  <Link to={'/login'}><li><BiLogIn size={32}/></li></Link>
                </div>
            </ul>
        </nav>
      </div>
    </div>
  )
}
