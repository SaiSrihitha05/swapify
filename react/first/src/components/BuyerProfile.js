import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function BuyerProfile() {
  let { currentUser } = useSelector(
    (state) => state.buyerSellerLoginReducer
  );
  return (
    <div className="container">

     {/* <NavLink to='products' className='fs-4 text-primary nav-link mt-4'>All products</NavLink> */}
     <br /><br />
      <Outlet />
    
    </div>
  );
}

export default BuyerProfile;