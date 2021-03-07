import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axiosWithAuth from "../Utility/axiosWithAuth";

const EditRecipe = (props) => {
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

  let { id } = useParams();
  const newID = id.replace(/:/g, "");

  useEffect(() => {
    axiosWithAuth()
      .get(`https://backendfinalcooking.herokuapp.com/api/recipes/${newID}`)
      .then((res) => {
        setValues(res.data);
      })
      .catch((err) => {
        console.log("axios grab recipe edit error", err);
      });
  }, [newID]);

  const handleChange = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(
        `https://backendfinalcooking.herokuapp.com/api/recipes/${newID}`,
        value
      )
      .then((res) => {
        return axiosWithAuth()
          .get(`https://backendfinalcooking.herokuapp.com/api/recipes/${newID}`)
          .then((res) => {
            push("/home");
          })
          .catch((err) => {
            console.log("Edit recipe error", err.response);
          });
      })
      .catch((err) => {
        console.log(`recipe error, ${err.message}`);
      });
  };
  return (
    <div>
      <h2>Edit a Recipe</h2>
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
        <button>Edit Recipe</button>
      </form>
    </div>
  );
};
export default EditRecipe;
