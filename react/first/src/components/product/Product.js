
import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { axiosWithToken } from "../../axiosWithToken";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdRestore } from "react-icons/md";
import { FcPortraitMode } from "react-icons/fc";
import { FcComments } from "react-icons/fc";
import { BiCommentAdd } from "react-icons/bi";

function Product() {
  const { state } = useLocation();
  const { currentUser } = useSelector((state) => state.buyerSellerLoginReducer);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [comment, setComment] = useState('');
  const [productEditStatus, setProductEditStatus] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(state);
  const dispatch = useDispatch();

  // Add to cart function
  // const handleAddToCart = async () => {
  //   try {
  //     const res = await axiosWithToken.post('http://localhost:4000/buyer-api/cart', {
  //       productId: currentProduct.productId,
  //       quantity: 1
  //     });

  //     if (res.data.message === "Product added to cart") {
  //       console.log("Product added to cart successfully");
  //       dispatch(addToCartAction(currentProduct));
  //       navigate('/cart');
  //     } else {
  //       console.log("Failed to add product to cart");
  //     }
  //   } catch (error) {
  //     console.error("Error adding to cart:", error);
  //   }
  // };
  

  const deleteProduct = async () => {
    let prod = { ...currentProduct };
    delete prod._id;
    let res = await axiosWithToken.put(`http://localhost:4000/seller-api/product/${currentProduct.productId}`, prod);
    if (res.data.message === "Product Deleted") {
      setCurrentProduct({ ...currentProduct, status: res.data.payload });
    }
  };

  const restoreProduct = async () => {
    let prod = { ...currentProduct };
    delete prod._id;
    let res = await axiosWithToken.put(`http://localhost:4000/seller-api/product/${currentProduct.productId}`, prod);
    if (res.data.message === "Product Restored") {
      setCurrentProduct({ ...currentProduct, status: res.data.payload });
    }
  };

  const writeComment = async (commentObj) => {
    commentObj.username = currentUser.username;
    let res = await axiosWithToken.post(`http://localhost:4000/buyer-api/comment/${state.productId}`, commentObj);
    if (res.data.message === 'Comment Added') {
      setComment(res.data.message);
    }
  };

  const handleProceedToBuy = () => {
    // Assuming the payment page receives the product name (title) and price as query parameters
    navigate(`/payment?productName=${state.title}&price=${state.price}`);
  };
  

  const enableEditState = () => {
    setProductEditStatus(true);
  };

  const saveModifiedProduct = async (editedProduct) => {
    let modifiedProduct = { ...state, ...editedProduct };
    modifiedProduct.dateOfModification = new Date();
    delete modifiedProduct._id;
    let res = await axiosWithToken.put('http://localhost:4000/seller-api/product', modifiedProduct);
    if (res.data.message === 'Product Modified') {
      setProductEditStatus(false);
      navigate(`/seller-profile/product/${modifiedProduct.productId}`, { state: res.data.product });
    }
  };

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    return `${date}/${day}/${year}`;
  }

  return (
    <div className="container">
      {productEditStatus === false ? (
        <>
          <div className="d-flex justify-content-between">
            <br />
            <br />
            <div className="cont container">
              <div className="row">
                <div className="col-md-6 mx-auto my-auto">
                  <img className="image" style={{ width: "75%" }} src={state.imageurl} alt="" />
                </div>
                <div className="col-md-6">
                  <p className="title display-6">{state.title}</p>
                  <p className="desc" style={{ fontSize: "23px" }}>{state.description}</p>
                  {state.category !== 'Medical' && (
                    <>
                      <p className="" style={{ fontSize: "18px" }}>Rating⭐ : 5/ 5</p>
                      <p style={{ fontSize: "20px" }} className="text-secondary">Flash Sale⚡</p>
                    </>
                  )}
                  <p style={{ fontSize: "25px" }} className="text-secondary">{state.category}</p>
                  <p className="display-6 text-bold">${state.price}</p>
                  {currentUser.userType === "buyer" && (
                    <>
                      <button className="btn btn-success" >
                        Add to Cart <FaShoppingCart />
                      </button>
                      <button className="btn btn-success" onClick={handleProceedToBuy}>
                        Proceed to Buy
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
            {currentUser.userType === "seller" && (
        <div className="d-flex align-items-center">
          <button className="me-2 btn btn-warning" onClick={enableEditState}>
            <CiEdit className="fs-2" />
          </button>
          {currentProduct.status === true ? (
            <button className="me-2 btn btn-danger" onClick={deleteProduct}>
              <MdDelete className="fs-2" />
            </button>
          ) : (
            <button className="me-2 btn btn-info" onClick={restoreProduct}>
              <MdRestore className="fs-2" />
            </button>
          )}
        </div>
      )}

            </div>
          </div>
          <div>
            <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p style={{ fontSize: "30px" }}>No comments yet...</p>
              ) : (
                state.comments.map((commentObj, ind) => {
                  return (
                    <div key={ind} className="bg-light p-3">
                      <p className="fs-4" style={{ color: "dodgerblue", textTransform: "capitalize" }}>
                        <FcPortraitMode className="fs-2 me-2" />
                        {commentObj.username}
                      </p>
                      <p style={{ fontFamily: "fantasy", color: "lightseagreen" }} className="ps-4">
                        <FcComments className="me-2" />
                        {commentObj.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
            <h1>{comment}</h1>
            {currentUser.userType === "buyer" && (
              <form onSubmit={handleSubmit(writeComment)}>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4"
                  placeholder="Write comment here...."
                />
                <button type="submit" className="btn btn-success">
                  Add a Comment <BiCommentAdd className="fs-3" />
                </button>
              </form>
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(saveModifiedProduct)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" {...register("title")} defaultValue={state.title} />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="form-label">Select a category</label>
            <select {...register("category")} id="category" className="form-select" defaultValue={state.category}>
              <option value="Medical">Medical</option>
              <option value="Vehicle">Vehicle</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="form-label">Price</label>
            <input type="number" className="form-control" id="price" {...register("price")} defaultValue={state.price} />
          </div>
          <div className="mb-4">
            <label htmlFor="Photos" className="form-label">Select Images</label>
            <input type="text" className="form-control" id="Photos" {...register("imageurl")} defaultValue={state.imageurl} />
          </div>
          <div className="mb-4">
            <label htmlFor="ContactNo" className="form-label">Contact No</label>
            <input type="text" className="form-control" id="ContactNo" {...register("ContactNo")} defaultValue={state.ContactNo} />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea {...register("description")} className="form-control" id="description" rows="10" defaultValue={state.description}></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-success">Save</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Product;
