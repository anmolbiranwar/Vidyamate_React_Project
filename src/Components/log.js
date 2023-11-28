import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
const navigate=useNavigate();

  function login() {
    console.log("login successfully");
  }
  function forgotPassword() {
    console.log("Forgot Password clicked");
  }
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://api.vidyamate.in/MachineTest/user_login/", values)
      .then((result) =>{
      if(result.data.msg==='login successfully.')
      {
        console.log(result);
        navigate('/dashboard')
      }else{
        setMsg("Invalid credentials");
      }
    }
      )
      .catch((err) => setMsg(err.data.msg));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage bg-primary">
      <div className="p-5 rounded border loginForm bg-white">
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3">
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded"
            />
            <span
              className="input-group-text bi bi-person-fill"
              id="inputGroupPrepend3"
            ></span>
          </div>

          <div className="input-group mb-2">
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded"
            />
            <i
              className="input-group-text bi bi-eye-slash-fill"
              id="togglePassword"
            ></i>
          </div>
          <div className="mb-2">
            <button
              type="button"
              className="btn btn-link"
              onClick={forgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            className="btn btn-success w-100 rounded-0 bg-primary"
            onClick={login}
          >
            Sign in
          </button>
          {msg && (
            <div
              className={`mt-2 text-center ${
                msg.includes("success") ? "text-success" : "text-danger"
              }`}
            >
              {msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
