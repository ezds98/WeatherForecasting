import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserRegister.css";
// import * as createUser  from "../../utils/https";

const Register = () => {
  const navigation = useNavigate();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  // const initialValues = { email, password};
  // const [formValues, setFormValues] = useState();
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);

  // const handleChanage = (e) => {

  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  //   // console.log(formValues);
  // };

  // to store value in local storage
  const handleSubmit = (e) => {
    // const res = await http.createUser(values);
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input));

    // setFormErrors(validatae(formValues));
    // setIsSubmit(true);

    navigation({ pathname: "/login" });
  };

  // const validatae = (values) => {
  //   const errors = {};
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  //   if (!values.email) {
  //     errors.email = "email is required!";
  //   } else if (!regex.test(values.email)) {
  //     errors.email = "This is not a valid email format!";
  //   }
  //   if (!values.password) {
  //     errors.password = "password is requoired!";
  //   } else if (values.password.length < 4) {
  //     errors.password = "Password must be more than 4 character!";
  //   } else if (values.password > 10) {
  //     errors.password = "Password cannot exceed more than 10 character!";
  //   }
  //   return errors;
  // };
  // const navigation = useNavigate();
  // const handleLogin = () => {
  // localStorage.setItem("isLoggedIn", JSON.stringify(true));
  // navigation({ pathname: "/" });
  // };

  return (
    <>
      <div className="register">
        <h1 className="registerHeading">Sign Up</h1>

        <form onSubmit={handleSubmit}>
          <label name="name" className="name">
            Name:
          </label>
          <input
            type="text"
            id="username"
            placeholder="enter your name"
            // ref={userRef}
            autoComplete="off"
            required
            name="name"
            value={input.name}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />

          {/* <p>{formErrors.email}</p> */}
          <label name="username" className="username">
            Email:
          </label>

          <input
            type="email "
            // id="emailName  "
            placeholder="username@gmail.com"
            // ref={userRef}
            autoComplete="off"
            // required
            name="email"
            value={input.email}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />

          {/* <p>{formErrors.email}</p> */}

          <label name="password" className="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            // name="password"
            placeholder="enter a password"
            // required
            name="password"
            value={input.password}
            onChange={(e) =>
              setInput({
                ...input,
                [e.target.name]: e.target.value,
              })
            }
          />
          {/* <p>{formErrors.password}</p> */}
          <button className="loginBtn" htmlType="submit">
            Sign Up
          </button>
        </form>
        <p className="para">
          Need an Account?
          <br />
          <span className="line">
            <Link to="/login" className="signIn">
              {" "}
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Register;
