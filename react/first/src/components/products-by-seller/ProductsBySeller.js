import axios from "axios";
import { axiosWithToken } from '../../axiosWithToken';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import './ProductsBySeller.css'; 

function ProductsBySeller() {
  const [productsList, setProductsList] = useState([]);
  let navigate = useNavigate();
  let { currentUser } = useSelector(
    (state) => state.buyerSellerLoginReducer
  );

  const getProductsOfCurrentSeller = async () => {
    console.log(currentUser.username);
    let res = await axiosWithToken.get(`http://localhost:4000/seller-api/products/${currentUser.username}`);
    console.log(res);
    setProductsList(res.data.payload);
  };

  const readProductByProductId = (productObj) => {
    navigate(`../product/${productObj.productId}`, { state: productObj });
  };

  useEffect(() => {
    getProductsOfCurrentSeller();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-3 g-4 mt-5">
        {productsList && productsList.map((product) => (
          <div className="col" key={product.productId}>
            <div className="card product-card">
              <img src={product.imageurl} className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description.substring(0, 80) + "...."}
                </p>
                <button className="btn btn-primary" onClick={() => readProductByProductId(product)}>
                  <span>View Product</span>
                </button>
              </div>
              <div className="card-footer">
                <small className="text-body-secondary">
                  Last updated on {product.dateOfModification}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
}

export default ProductsBySeller;
