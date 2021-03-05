import React, { useEffect, useState } from "react";
import axiosWithAuth from "../Utility/axiosWithAuth";
import { useParams, useHistory } from "react-router-dom";

const RecipesClicked = (props) => {
  const [clicked, setClicked] = useState([]);
  let { id } = useParams();
  const {push} = useHistory()
  const newID = id.replace(/:/g, "");
  
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
      .then(res=>{
          push('/home')
      })
      .catch(err=>{
          console.log('Axios Delete error', err)
      })
  }
  return (
    <div>
    {clicked.map((item,idx)=>{
        return(
            <div key={idx}>
            <h2>{item.title}</h2>
            <span>{item.recipe_source}</span>
            <p>{item.ingredients}</p>
            <span>{item.category}</span>
            <button onClick={deleteClicked}>Delete</button>
            </div>
        )
    })}
    </div>
  );
};
export default RecipesClicked;
