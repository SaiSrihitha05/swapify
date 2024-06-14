import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [err, setErr] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);

  async function onSignUpFormSubmit(userObj) {
    try {
      const res = await axios.post(`http://localhost:4000/${userObj.userType}-api/user`, userObj);
      console.log(res);
      if (res.status === 201) {
        setSignupSuccess(true);
        setErr("");
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErr('An error occurred during signup. Please try again.');
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 text-center d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-6 text-black pt-5">Sign Up</h1>
          <form onSubmit={handleSubmit(onSignUpFormSubmit)} className="w-75">
            <div className="form">
              {err && <p className="text-danger fs-3">{err}</p>}
              {signupSuccess && <p className="text-success fs-3">Signup successful! Redirecting to Sign In...</p>}
              <div className="mb-4">
                <label htmlFor="user" className="form-check-label me-3" style={{ fontSize: '1.2rem', color: "var(--light-dark-grey)" }}>
                  Register as
                </label>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="seller"
                    value="seller"
                    {...register("userType", { required: true })}
                  />
                  <label htmlFor="seller" className="form-check-label" style={{ color: "var(--crimson)" }}>
                    Seller
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="buyer"
                    value="buyer"
                    {...register("userType", { required: true })}
                  />
                  <label htmlFor="buyer" className="form-check-label" style={{ color: "var(--crimson)" }}>
                    Buyer
                  </label>
                </div>
              </div>
              {errors.userType && <p className="text-danger">User type is required</p>}
              <input
                style={{ width: '300px' }}
                type="text"
                {...register("username", { required: true, minLength: 4 })}
                className={`form-control mx-auto mt-5 p-2 ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Username"
              />
              {errors.username?.type === "required" && (
                <p className="text-danger">Username is required</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className="text-danger">Username should be at least 4 characters long</p>
              )}
              <input
                style={{ width: '300px' }}
                type="password"
                {...register("password", { required: true, minLength: 8 })}
                className={`form-control mx-auto mt-4 p-2 ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-danger">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-danger">Password should be at least 8 characters long</p>
              )}
              <input
                style={{ width: '300px' }}
                type="text"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                className={`form-control mx-auto mt-4 p-2 ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-danger">Invalid email format</p>
              )}
            </div>
            <button className="btn btn-success mt-4" type="submit">
              Sign Up
            </button>
            <h5 className="p-4">
              Already have an account? <Link to="/signin">Sign In</Link> here
            </h5>
          </form>
        </div>
        <div className="col-md-6 p-5 d-none d-md-block">
          <br />
          <img src="data:image/png;base64,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" alt="Signup" className="img-fluid" style={{ height: '60vh', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

export default Signup;
