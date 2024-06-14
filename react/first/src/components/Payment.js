import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Payment() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  useEffect(() => {
    // Extract the product name and price from the URL query parameters
    const params = new URLSearchParams(search);
    const productNameParam = params.get('productName');
    const priceParam = params.get('price');
    if (productNameParam && priceParam) {
      setProductName(productNameParam);
      setPrice(priceParam);
    }
  }, [search]);

  const handleConfirmOrder = async () => {
    try {
      setPaymentProcessing(true);
      // Check if productName and price are not null
      if (productName && price) {
        const response = await axios.post('/checkout', {
          productName: productName,
          price: price
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
      {productName && price ? (
        <>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" value={productName} readOnly />
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input type="text" className="form-control" value={price} readOnly />
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
