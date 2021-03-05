import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const initialFormValues = {
    username: "",
    password: "",
  };
  const {push} = useHistory()

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
      .post("https://backendfinalcooking.herokuapp.com/api/auth/login", value)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        push('/home')
      })
      .catch((err) => {
        console.log(`Axios register error, ${err.message}`);
      });
  };
  return (
    <div>
      <h2>Login</h2>
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
        <button>Login</button>
      </form>
    </div>
  );
};
export default Login;
