import React from 'react'
import './style/Navigation.css'
import { BiLogIn } from "react-icons/bi";
import { ImProfile,ImHome } from "react-icons/im";
import { RiFolderInfoLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


// AiOutlineInfo
export default function Navigation() {
  return (
      <div className='container-nav'>
        <nav>
            <ul className='left-nav-list'>
            <Link  to={'/'}>
              <div style={{display:'flex'}}>
              <span><ImHome size={25}  color='black' className='icon-field' /></span><li >Home</li>
              </div>
               </Link>
            <Link to={'/about'}>
              <div style={{display:'flex'}}>
                <span><RiFolderInfoLine size={25} color='black'className='icon-field'  /></span><li>About</li>
              </div>
            </Link>
            <Link to={'/profile'}> 
            <div style={{display:'flex'}}>
              <span><ImProfile size={25}   color='black' className='icon-field' /></span> <li>Profile</li>
            </div>
            </Link>
            <Link to={'/login'}>
                                <div style={{display:'flex'}}>
                                  <li><BiLogIn size={32} color='red'/></li>
                                  </div>
                                  </Link>
                
            </ul>
        </nav>
      </div>
  )
}
