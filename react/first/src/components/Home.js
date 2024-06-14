import React from 'react';
import { useNavigate } from 'react-router-dom';
function Home() {
  let navigate = useNavigate();
  function handleLogin(){
      navigate('/signin')
  }
  return (
    <div>
      <div className="jumbotron jumbotron-fluid bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556740714-6455bd3f7f1a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')" }}>
  <div className="container">
    <br />
    <h1 className="display-5 text-black text-bold">Welcome to Swapify - Give & Get Goods!</h1>
    <p className="lead text-black">
      Swapify is dedicated to solving the common problem of clutter accumulation and the environmental harm caused by excessive consumption.
    </p>
    <hr className="my-4" />
    <p className="text-black">
      Our mission is to enhance the purchasing experience by connecting individuals who share a concern for sustainability.
    </p>
    <p className="lead">
      <button className='btn' onClick={handleLogin}>Start Shopping</button>
    </p>
  </div>
</div>
      
      <div className="container mt-5">
        <h2>Flash Deals</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {/* Dummy cards for flash deals */}
          <div className="col">
            <div className="card h-100">
              <img src="https://apollo.olx.in/v1/files/codifvg5g397-IN/image;s=300x600;q=60" className="card-img-top" alt="Flash Deal" />
              <div className="card-body">
                <h4>Flash Deal 1</h4>
                <a href="#" className="btn btn-info">View Deal</a>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-120">
              <img src="https://apollo.olx.in/v1/files/4fmnu16soaee2-IN/image;s=300x600;q=60" className="card-img-top" alt="Flash Deal" />
              <div className="card-body">
              <h4>Flash Deal 2</h4>
                <a href="#" className="btn btn-info">View Deal</a>
              </div>
            </div>
          </div>  
          <div className="col">
            <div className="card h-120">
              <img src="https://apollo.olx.in/v1/files/a1onbaagsik02-IN/image;s=300x600;q=60" className="card-img-top" alt="Flash Deal" />
              <div className="card-body">
              <h4>Flash Deal 3</h4>
                <a href="#" className="btn btn-info">View Deal</a>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      <div className="container mt-5">
        <p className="fs-5">
          Swapify - Give & Get Goods is dedicated to solving the common problem of clutter accumulation and the environmental harm caused by excessive consumption. ♻️🌍 We provide a user-friendly platform where people can give their pre-loved goods new life. ✨ This innovative concept allows users to effortlessly exchange or acquire items at affordable costs, promoting a circular economy that significantly reduces waste. 🔄💰
          <br />
          <br />
          Our mission is to enhance the purchasing experience by connecting individuals who share a concern for sustainability. 🌱 At Give & Get Goods, we emphasize affordability, waste reduction, and a commitment to creating a better future for everyone. 🌟 Join us on our journey towards a more sustainable and environmentally friendly world. Together, we can make a difference. 🌿🤝
        </p>
      </div>
    </div>
  );
}

export default Home;
