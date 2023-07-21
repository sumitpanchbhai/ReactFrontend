import React from 'react'
import './style/Navigation.css'
export default function Navigation() {
  return (
    <div>
      <div className='container-nav'>
        <nav>
            <ul style={{display:'flex',justifyContent:'left'}}>
                        <li style={{marginRight:'100px'}}>Home</li>
                        <li style={{marginRight:'100px'}}>About</li>
                <div style={{position:'absolute',right:'10px'}}>
                        <li>Log Out</li>
                </div>
            </ul>
        </nav>
      </div>
    </div>
  )
}
