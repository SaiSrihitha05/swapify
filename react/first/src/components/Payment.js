import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const { products, totalAmount } = state;

  const handleConfirmOrder = async () => {
    try {
      setPaymentProcessing(true);
      // Check if products and totalAmount are not null
      if (products && totalAmount) {
        const response = await axios.post('/checkout', {
          products,
          totalAmount
        });
        
        if (response.status === 200) {
          alert('Order confirmed successfully!');
          // Redirect to products page after successful order confirmation
          navigate('/buyer-profile/products');
        } else {
          setPaymentError('Failed to confirm order. Please try again.');
        }
      } else {
        setPaymentError('Product details not found in URL. Please try again.');
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      setPaymentError('An error occurred while confirming the order. Please try again later.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="container">
      <h2>Payment Details</h2>
      {products && totalAmount ? (
        <>
          <div className="product-list">
            {products.map((product, index) => (
              <div key={index} className="product-item">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>
          <div className="subtotal">
            <h3>Subtotal: ${totalAmount}</h3>
          </div>
        </>
      ) : (
        <div className="alert alert-danger">Product details not found in URL</div>
      )}
      {paymentError && <div className="alert alert-danger">{paymentError}</div>}
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleConfirmOrder}
        disabled={paymentProcessing}
      >
        {paymentProcessing ? 'Processing...' : 'Confirm Order'}
      </button>
    </div>
  );
}

export default Payment;
