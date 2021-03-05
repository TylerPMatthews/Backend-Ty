import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./login/login";
import axiosWithAuth from "./Utility/axiosWithAuth";
import Restricted from "./Utility/Restricted";
import Home from "./Home/Home";
import RecipesClicked from './recipes/RecipesClicked';

function App() {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("https://backendfinalcooking.herokuapp.com/api/recipes")
      .then((res) => {
        setRecipes(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Home axios error", err);
      });
  }, []);
  return (
    <div className="App">
      <Switch>
        <Restricted path="/home:id">
          <RecipesClicked recipes={recipes} />
        </Restricted>
        <Restricted path="/home">
          <Home recipes={recipes} setRecipes={setRecipes} />
        </Restricted>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
