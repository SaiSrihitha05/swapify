import './App.css';
import Home from './components/Home'
import RootLayout from './components/RootLayout';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Signin from './components/Signin';
import Signup from './components/SignUp';
import AddProduct from './components/add-product/AddProduct';
import BuyerProfile from './components/BuyerProfile';
import SellerProfile from './components/SellerProfile';
import ProductsBySeller from './components/products-by-seller/ProductsBySeller';
import Product from './components/product/Product';
import Products from './components/products/Products';
import { Navigate } from 'react-router-dom';
import Cart from './components/cart';
import RazorpayComponent from './components/Razorpay';
import Payment from './components/Payment';


function App() {
    let router=createBrowserRouter([
        {
          path:'',
          element:<RootLayout/>,
          children:[
          {
            path:'',
            element:<Home/>
          },
          {
            path:'signin',
            element:<Signin/>
          },{
            path: 'signup',
            element:<Signup/>
          },{
            path:'cart',
            element:<Cart/>
          },{
              path: 'payment',
              element: <Payment/>
            },
          {
            path:"buyer-profile",
            element:<BuyerProfile/>,
            children:[
              {
                path:"products",
                element:<Products />
              },
              {
                path:"product/:productId",
                element:<Product />
              },
              {
                path:'',
                element:<Navigate to='products' />
              }
            ]
          },
          {
            path:"seller-profile",
            element:<SellerProfile/>,
            children:[
              {
                path:'new-product',
                element:<AddProduct /> 
              },
              {
                path:'products-by-seller/:seller',
                element:<ProductsBySeller />,
               
              },
              {
                path:"product/:productId",
                element:<Product />
              },
              {
                path:'',
                element:<Navigate to='products-by-seller/:seller' />
              }
            ]
          }
          ]
        }
    ] 
  );
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App;
