import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../Utility/axiosWithAuth";

const AddRecipe = (props) => {
  const initialFormValues = {
    title: "",
    recipe_source: "",
    recipe_image: "",
    ingredients: "",
    category: "",
    user_id: "",
  };
  const { push } = useHistory();

  const [value, setValues] = useState(initialFormValues);
  const handleChange = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("https://backendfinalcooking.herokuapp.com/api/recipes", value) 
      .then((res) => {
        return axiosWithAuth()
          .get("https://backendfinalcooking.herokuapp.com/api/recipes")
          .then((res) => {
            props.setRecipes(res.data);
            push("/home");
          })
          .catch((err) => {
            console.log("Create recipe error", err.response);
          });
      })
      .catch((err) => {
        console.log(`Axios register error, ${err.message}`);
      });
  };
  return (
    <div>
      <h2>Add a Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            name="title"
            onChange={handleChange}
            value={value.title}
            type="text"
          />
        </label>
        <label>
          Recipe Source
          <input
            name="recipe_source"
            onChange={handleChange}
            value={value.recipe_source}
            type="text"
          />
        </label>
        <label>
          Recipe Image
          <input
            name="recipe_image"
            onChange={handleChange}
            value={value.recipe_image}
            type="text"
          />
        </label>
        <label>
          ingredients
          <input
            name="ingredients"
            onChange={handleChange}
            value={value.ingredients}
            type="text"
          />
        </label>
        <label>
          category
          <input
            name="category"
            onChange={handleChange}
            value={value.category}
            type="text"
          />
        </label>
        <label>
          User ID
          <input
            name="user_id"
            onChange={handleChange}
            value={value.user_id}
            type="text"
          />
        </label>
        <button>Add Recipe</button>
      </form>
    </div>
  );
};
export default AddRecipe;
