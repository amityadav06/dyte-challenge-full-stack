import React, { useState } from "react";
import pic from "../images/login-img.svg";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid registration");
    } else {
      window.alert("Registration successfull");
      console.log("registration successfull");
      history.push("/login");
    }
  };

  return (
    <section className="signup ">
      <div className="container mt-4"></div>
      <div className="singup-content content">
        <div className="signup-form">
          <h2 className="form-title">Sign up</h2>
          <form method="POST" className="register-form">
            <div className="form-group">
              <label htmlFor="name">
                <i className="zmdi zmdi-account material-icons-name"></i>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={user.name}
                onChange={handleInput}
                placeholder="your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <i className="zmdi zmdi-email material-icons-name"></i>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleInput}
                autoComplete="off"
                placeholder="your email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">
                <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={handleInput}
                autoComplete="off"
                placeholder="your number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="work">
                <i className="zmdi zmdi-slideshow material-icons-name"></i>
              </label>
              <input
                type="text"
                name="work"
                id="work"
                value={user.work}
                onChange={handleInput}
                autoComplete="off"
                placeholder="your profession"
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
                value={user.password}
                onChange={handleInput}
                autoComplete="off"
                placeholder="your password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cpassword">
                <i className="zmdi zmdi-lock material-icons-name"></i>
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={user.cpassword}
                onChange={handleInput}
                autoComplete="off"
                placeholder="Confirm your password"
              />
            </div>
            <div className="form-group form-button">
              <input
                type="submit"
                name="signup"
                id="signup"
                className="form-submit"
                onClick={postData}
                value="register"
              />
            </div>
          </form>
        </div>
        <div className="signup-image">
          <figure>
            <img src={pic} className="signup-img" alt="logo" />
          </figure>
          <NavLink to="/login" className="signup-image-link">
            I am already registered
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default Signup;
