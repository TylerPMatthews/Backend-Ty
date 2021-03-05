import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const initialFormValues = {
    username: "",
    password: "",
  };

  const [value, setValues] = useState(initialFormValues);

  const onChange = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backendfinalcooking.herokuapp.com/api/auth/register",
        value
      )
      .then((res) => {
        window.alert("User has been added to the database");
      })
      .catch((err) => {
        console.log(`Axios register error, ${err.message}`);
      });
  };
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <label>
          Username
          <input
            name="username"
            type="text"
            onChange={onChange}
            value={value.username}
          ></input>
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            onChange={onChange}
            value={value.password}
          ></input>
        </label>
        <button>Register</button>
      </form>
    </div>
  );
};
export default Register;
