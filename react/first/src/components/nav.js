import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Image from './Image.png'

const Navbar = () => {
  return (
    <nav className='navbar'> 
    <Link to="/" className="text-white p-1">
            <img src={Image} alt="" style={{ width: '70px', height: '50px' ,paddingLeft:'3px'}} className='d-inline' />
    </Link>
    <ul>
    <li className='nav-link register'>
        <Link to="/signup">Register</Link>
      </li>
      <li className='nav-link login' style={{paddingRight:'3px'}}>
        <Link to="/signin">Login</Link>
      </li>
     
    </ul>
  </nav>
  );
};

export default Navbar;