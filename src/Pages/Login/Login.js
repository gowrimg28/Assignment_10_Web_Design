import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from '../../features/authSlice'; // Import loginSuccess action

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = () => {
    if (!email) {
      setEmailError("Email is required");
    } else if (!/^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(email)) {
      setEmailError("Please use a Northeastern email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();

    validateEmail();
    validatePassword();

    if (!emailError && !passwordError) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
          const resJson = await response.json();

          // Dispatch to Redux store
          dispatch(loginSuccess(resJson));

          // Navigate based on user type
          if (resJson.user_type === "employee") {
            navigate("/home", { replace: true });
          } else if (resJson.user_type === "admin") {
            navigate("/employees", { replace: true });
          }

          toast.success("Login successful!");
        } else {
          const errorData = await response.json();
          console.error("Login failed:", errorData.error);
          toast.error("Incorrect email or password. Please try again.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <br />
      <div className="container">
        <form noValidate id="login-form" onSubmit={submitLogin}>
          <div className="row justify-content-center align-items-center">
            <h4>Login Form</h4>
            <hr />
            <br />
            <div className="col-lg-4">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  id="emailInput"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateEmail}
                />
                <div id="email-error" className="invalid-feedback">
                  {emailError}
                </div>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className={`form-control ${passwordError ? "is-invalid" : ""}`}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                <div id="password-error" className="invalid-feedback">
                  {passwordError}
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary" id="btnSubmit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Login;
