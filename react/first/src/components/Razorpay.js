import React, { useEffect } from 'react';

const RazorpayComponent = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_Neb519ebFYMSx2');
    script.async = true;

    // Handle script loading error
    script.onerror = () => {
      console.error('Error loading Razorpay script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <form>
      {/* Additional content or styling for the form */}
    </form>
  );
};

export default RazorpayComponent;