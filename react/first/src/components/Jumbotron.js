import React from 'react';
import './Jumbotron.css'; // If you have a CSS file for the jumbotron styles

const Jumbotron = () => {
  return (
    <div className="jumbotron jumbotron-fluid bg-cover" style={{ 
      backgroundImage: "url('https://images.unsplash.com/photo-1556740714-6455bd3f7f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')", 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh' // or whatever height you prefer
    }}>
      <div className="container">
        <h1 className="display-4 text-white">Welcome to Swapify - Give & Get Goods!</h1>
        <p className="lead text-white">
          Swapify is dedicated to solving the common problem of clutter accumulation and the environmental harm caused by excessive consumption.
        </p>
        <hr className="my-4" />
        <p className="text-white">
          Our mission is to enhance the purchasing experience by connecting individuals who share a concern for sustainability.
        </p>
        <p className="lead">
          <a className="btn btn-primary btn-lg btn-rounded" href="/products" role="button">Start Shopping</a>
        </p>
      </div>
    </div>
  );
};

export default Jumbotron;
