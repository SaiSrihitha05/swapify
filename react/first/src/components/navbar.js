import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'
import Image from './Image.png'
import { useSelector,useDispatch } from 'react-redux';
import { resetState } from '../redux/slices/buyerSellerSlice';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  let {loginUserStatus,currentUser,errorOccured,errMsg} = useSelector((state)=>state.buyerSellerLoginReducer)
  let dispatch = useDispatch()
 
  function signOut(){
    localStorage.removeItem('token')
    dispatch(resetState())
  }
  return (
    <nav className="navbar">
      
          <Link to="/" className="navbar-brand text-white">
            <img src={Image} alt="" style={{ width: '70px', height: '50px' }} className='d-inline' />
          </Link>
          {loginUserStatus === false ? (
        <>
            <ul>
            <li className='nav-link register'>
                <Link to="/signup">Register</Link>
              </li>
              <li className='nav-link login' style={{paddingRight:'3px'}}>
                <Link to="/signin">Login</Link>
              </li>
            
            </ul>
          </>
        ) : (
          <div>
          <span className="lead  fs-4 me-3 fw-1 d-block"  style={{ color: "#70bbff" ,fontSize:'1.1rem',fontFamily:'fantasy'}}>{currentUser.username}
                   <sup style={{color:'var(--dark-green)',fontSize:'1rem'}}>({currentUser.userType})</sup>
                   </span>
                   {currentUser.userType === "buyer"&&
                   <>
                   <Link className="nav-link text-white" to="/cart">
                                Cart <FaShoppingCart />
                            </Link>
                    </>
                    }
          <NavLink
                  className="nav-link"
                  to="signin"
                  style={{ color: "white",padding:"2px"}}
                  onClick={signOut}
                >
                   SignOut
                </NavLink>
                </div>
        )}
     
    </nav>
  );
};

export default Navbar;
