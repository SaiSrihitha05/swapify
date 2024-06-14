
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { buyerSellerLoginThunk } from "../redux/slices/buyerSellerSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
    useSelector((state) => state.buyerSellerLoginReducer);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  function onSignUpFormSubmit(userCred) {
    dispatch(buyerSellerLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === "seller") {
        navigate("/seller-profile");
      }
      if (currentUser.userType === "buyer") {
        navigate("/buyer-profile");
      }
    }
  }, [loginUserStatus]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6 p-5 d-none d-md-block">
          <br />
          <img src="data:image/png;base64,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" alt="Signup" className="img-fluid" style={{ height: '60vh', objectFit: 'cover' }} />
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow">
            <div className="card-title text-center border-bottom">
              <h2 className="p-3">Signin</h2>
            </div>
            <div className="card-body">
              {/* invalid cred err */}
              {errorOccurred === true && (
                <p className="text-center" style={{ color: "var(--crimson)" }}>
                  {errMsg}
                </p>
              )}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                {/* radio */}
                <div className="mb-4">
                  <label
                    htmlFor="user"
                    className="form-check-label me-3"
                    style={{
                      fontSize: "1.2rem",
                      color: "var(--light-dark-grey)",
                    }}
                  >
                    Login as
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="seller"
                      value="seller"
                      {...register("userType")}
                    />
                    <label htmlFor="seller" className="form-check-label">
                      Seller
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="buyer"
                      value="buyer"
                      {...register("userType")}
                    />
                    <label htmlFor="buyer" className="form-check-label">
                      Buyer
                    </label>
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    {...register("username")}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password")}
                  />
                </div>

                <div className="text-end">
                  <button type="submit" className="btn">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signin;