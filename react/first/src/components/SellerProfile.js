// src/SellerProfile.js
import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function SellerProfile() {
  let { currentUser } = useSelector(state => state.buyerSellerLoginReducer);

  return (
    <div className="seller-profile container p-3">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="mb-3">Welcome, {currentUser.username}</h2>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col text-center">
          <ul className="nav justify-content-center fs-4">
            <li className="nav-item">
              <button className="btn btn-info mx-2">
                <NavLink className="nav-link text-white" to={`products-by-seller/${currentUser.username}`}>
                  Products
                </NavLink>
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-info mx-2">
                <NavLink className="nav-link text-white" to="new-product">
                  Add New Product
                </NavLink>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
