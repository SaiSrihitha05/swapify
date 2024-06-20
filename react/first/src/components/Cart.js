import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  clearCart,
  getTotals,
  removeFromCart,
} from '../redux/slices/cartSlice';
import './Cart.css';
import { Link } from "react-router-dom";
import Modal from './modal';  // Import the Modal component

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [itemAddedMessage, setItemAddedMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handlePayment = () => {
    const productDetails = cart.cartItems.map(item => ({
      name: item.title,
      price: item.price,
      description: item.description,
    }));
    navigate('/payment', { state: { products: productDetails, totalAmount: cart.cartTotalAmount } });
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cart.cartItems.find(item => item.productId === product.productId);
    if (isProductInCart) {
      setShowModal(true);
    } else {
      dispatch(addToCart(product));
      setItemAddedMessage(`${product.title} has been added to the cart`);
      setTimeout(() => {
        setItemAddedMessage('');
      }, 3000); // Clear message after 3 seconds
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleProducts = () => {
    navigate('/buyer-profile/products');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {itemAddedMessage && <div className="item-added-message">{itemAddedMessage}</div>}
      <Modal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        message="Item is already in the cart"
      />
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span onClick={handleProducts}>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.productId}>
                <div className="cart-product">
                  <img src={cartItem.imageurl} alt={cartItem.title} />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-total-price">
                  ${cartItem.price}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={handleClearCart}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <button onClick={handlePayment}>Checkout</button>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
