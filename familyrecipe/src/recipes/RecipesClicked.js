import React, { useEffect, useState } from "react";
import axiosWithAuth from "../Utility/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const RecipesClicked = (props) => {
  const [clicked, setClicked] = useState([]);
  let { id } = useParams();
  const { push } = useHistory();
  const newID = id.replace(/:/g, "");

  let history = useHistory();
  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://backendfinalcooking.herokuapp.com/api/recipes/${newID}`)
      .then((res) => {
        setClicked(res.data);
      })
      .catch((err) => {
        console.log("axios clciked error", err);
      });
  }, [newID]);

  const deleteClicked = () => {
    axiosWithAuth()
      .delete(`https://backendfinalcooking.herokuapp.com/api/recipes/${newID}`)
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

  const edit = () => {
    history.push(`/editrecipe:${newID}`)
  }
  return (
    <div>
      {clicked.map((item, idx) => {
        return (
          <div key={idx}>
            <h2>{item.title}</h2>
            <span>{item.recipe_source}</span>
            {item.recipe_image === null || item.recipe_image.length === 0 ? (
              <div></div>
            ) : (
              <img src={props.item.recipe_image} alt={props.item.title} />
            )}
            <p>{item.ingredients}</p>
            <span>{item.category}</span>
            <button onClick={deleteClicked}>Delete</button>
            <button onClick={edit}>Edit</button>
            <button onClick={goBack}>Back</button>
          </div>
        );
      })}
    </div>
  );
};
export default RecipesClicked;
