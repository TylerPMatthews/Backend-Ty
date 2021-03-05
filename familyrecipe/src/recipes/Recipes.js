import React from "react";
import { useHistory, useParams } from "react-router-dom";

const Recipes = (props) => {
    const {push} = useHistory()
    const movePage = () => {
        push(`/home:${props.item.recipe_id}`)
    }
  return (
    <div onClick={movePage}>
      <h2>{props.item.title}</h2>
      <span>{props.item.recipe_source}</span>
      {props.item.recipe_image === null ? (
        <div></div>
      ) : (
        <img src={props.item.recipe_image} alt={props.item.title} />
      )}
      <p>{props.item.ingredients}</p>
      <span>{props.item.category}</span>
    </div>
  );
};
export default Recipes;
