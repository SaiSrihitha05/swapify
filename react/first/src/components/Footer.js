import React from 'react';

function Footer() {
  return (
    <footer className=" text-light p-4" style={{backgroundColor:"#13174b"}}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>About Us</h4>
            <p>Swapify, where previously cherished items discover new owners.</p>
          </div>
          <div className="col-md-4">
            <h4>Quick Links</h4>
            <ul className="list-unstyled" style={{color:"white"}}>
              <li><a href="/">Home</a></li>
              <li><a href="/">Products</a></li>
              <li><a href="/">Categories</a></li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Contact Us</h4>
            <p>Email: contact@example.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
        <p>&copy; 2024 Swapify. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
