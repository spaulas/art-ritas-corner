import React from "react";
import Home from "components/Home";
import data from "data.json";
import "./styles.scss";
import Category from "components/Category";

const Main = () => {
  const renderCategories = () => {
    return Object.values(data.categories).map((category) => (
      <Category key={category.id} {...category} />
    ));
  };

  return (
    <div className="main-page">
      <Home />
      {renderCategories()}
    </div>
  );
};

export default Main;
