
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  let { register, handleSubmit } = useForm();
  let { currentUser } = useSelector(
    (state) => state.buyerSellerLoginReducer
   );
  let [err, setErr] = useState("");
  let navigate = useNavigate();
  let token=localStorage.getItem('token')
  //create axios with token
  const axiosWithToken = axios.create(
    {
      headers:{Authorization:`Bearer ${token}`}
    }
  )
  const postNewProduct = async (product) => {
    product.dateOfCreation = new Date();
    product.dateOfModification = new Date();
    product.productId = Date.now();
    product.username = currentUser.username;
    product.comments =  [];
    product.status = true;
    console.log(product)
    //make http post req
    let res = await axiosWithToken.post('http://localhost:4000/seller-api/product',product)
    console.log(res)
    if(res.data.message === "Product Added"){
      console.log(currentUser)
      navigate(`/seller-profile/products-by-seller/${currentUser.username}`)
    }else{
      setErr(res.data.message)
    }
   }
  

  //<p style="white-space: pre-line">multi-line text</p>
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Add Product</h2>
            </div>
            <div className="card-body bg-light">
              {/* {err.length!==0&&<p className='text-danger fs-5'>{err}</p>} */}
              <form onSubmit={handleSubmit(postNewProduct)}>
                <div className="mb-4">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    {...register("title")}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label">
                    Select a category
                  </label>
                  <select
                    {...register("category")}
                    id="category"
                    className="form-select"
                  >
                    <option value="Medical">Medical</option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    {...register("price")}
                  />
                </div>
                <div className="mb-4">
                <label htmlFor="Photos" className="form-label">
                Select Images
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="Photos"
                    {...register("imageurl")}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="ContactNo" className="form-label">
                Contact No
                </label>
                <input
                type="text"
                className="form-control"
                id="ContactNo"
                {...register("ContactNo")}
                />
                </div>
                <div className="mb-4">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
                    className="form-control"
                    id="description"
                    rows="10"
                  ></textarea>
                </div>

                <div className="text-end">
                  <button type="submit" className="text-dark">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  };
export default AddProduct;