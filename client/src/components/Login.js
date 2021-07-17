/* eslint-disable */
import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || !data) {
      window.alert("Invlid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("login successfull");
      history.push("/");
    }
  };

  return (
    <>
      <section className="sign-in">
        <div className="container mt-5"></div>
        <div className="signin-content">
          <div className="signin-image">
            {/* <figure>
              <img src="pic" alt="logo" />
            </figure> */}
            <NavLink to="/signup" className="signin-image-link">
              Create an account
            </NavLink>
          </div>
          <div className="signin-form">
            <h2 className="form-title">Sign in</h2>
            <form method="POST" className="register-form">
              <div className="form-group">
                <label htmlFor="email">
                  <i className="zmdi zmdi-email material-icons-name"></i>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <i className="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off"
                  placeholder="your password"
                />
              </div>

              <div className="form-group form-button">
                <input
                  type="submit"
                  name="signin"
                  id="signin"
                  onClick={loginUser}
                  className="form-submit"
                  value="Log in"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
