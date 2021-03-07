import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./login/login";
import axiosWithAuth from "./Utility/axiosWithAuth";
import Restricted from "./Utility/Restricted";
import Home from "./Home/Home";
import RecipesClicked from "./recipes/RecipesClicked";
import AddRecipe from "./AddRecipe/AddRecipe";
import EditRecipe from "./EditRecipe/EditRecipe";

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
        <Restricted exact path="/editrecipe:id">
          <EditRecipe />
        </Restricted>
        <Restricted exact path="/addrecipe">
          <AddRecipe setRecipes={setRecipes} />
        </Restricted>
        <Restricted exact path="/home:id">
          <RecipesClicked recipes={recipes} setRecipes={setRecipes} />
        </Restricted>
        <Restricted exact path="/home">
          <Home recipes={recipes} setRecipes={setRecipes} />
        </Restricted>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
