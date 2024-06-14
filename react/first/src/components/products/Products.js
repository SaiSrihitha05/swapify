import React, { useState, useEffect } from 'react';
import { axiosWithToken } from '../../axiosWithToken';
import { useNavigate, Outlet } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import './Products.css'; // Import the CSS file

function Products() {
  const [productsList, setProductsList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterOption, setFilterOption] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.buyerSellerLoginReducer);

  const getProductsOfCurrentSeller = async () => {
    try {
      const res = await axiosWithToken.get('http://localhost:4000/buyer-api/products');
      setProductsList(res.data.payload);
      setFilteredProducts(res.data.payload);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const readProductByProductId = (productObj) => {
    navigate(`../product/${productObj.productId}`, { state: productObj });
  };

  const handleFilterChange = (e) => {
    const selectedOption = e.target.value;
    setFilterOption(selectedOption);
    filterProducts(selectedOption, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(filterOption, query);
  };

  const filterProducts = (category, query) => {
    let filtered = productsList;

    if (category !== 'All') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (query) {
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    getProductsOfCurrentSeller();
  }, []);

  const filterOptions = ['All', 'Medical', 'Electronics', 'Vehicle', 'Others'];

  return (
    <div className='container'>
      <div className="filter-container">
        <label htmlFor="filter">Filter by category: </label>
        <select id="filter" onChange={handleFilterChange} value={filterOption}>
          {filterOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="search-container">
        <input 
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4 mt-5">
        {filteredProducts.map((product) => (
          <div className="col" key={product.productId}>
            <div className="card product-card">
              <img src={product.imageurl} alt="" className="card-img-top"/>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description.substring(0, 10) + "...."}
                </p>
                <div className='d-flex justify-content-between'>
                  {currentUser.userType === "buyer" && (
                    <>
                      <button className="btn btn-success" onClick={() => readProductByProductId(product)}>Buy now</button>
                      <button className="btn btn-success" onClick={() => handleAddToCart(product)}>
                        <FaShoppingCart />
                      </button>
                    </>
                  )}
                  {currentUser.userType === "seller" && (
                    <button className="btn btn-success" onClick={() => readProductByProductId(product)}>View Product</button>
                  )}
                </div>
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
  )
}

export default Products;
