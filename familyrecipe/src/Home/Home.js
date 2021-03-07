import React from "react";
import Recipes from "../recipes/Recipes";
import Nav from '../NAV/Nav';
const Home = (props) => {
  return (
    <>
    <div>
      <Nav/>
    </div>
    <div>
      {props.recipes.map((item, idx) => {
        return <Recipes item={item} key={idx} />;
      })}
    </div>
    </>
  );
};
export default Home;
