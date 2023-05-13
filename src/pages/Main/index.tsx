import React from "react";
import Home from "components/Home";
import data from "data.json";
import "./styles.scss";
import Category from "components/Category";

const Main = () => {
  const renderCategories = () => {
    Object.values(data.categories).map((category) => (
      <Category {...category} />
    ));
    return null;
  };

  return (
    <div className="main-page">
      <Home />
      {renderCategories()}
    </div>
  );
};

export default Main;
