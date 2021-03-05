import React from "react";
import Recipes from "../recipes/Recipes";
const Home = (props) => {
  return (
    <div>

      {props.recipes.map((item, idx) => {
        return <Recipes item={item} key={idx} />;
      })}
    </div>
  );
};
export default Home;
