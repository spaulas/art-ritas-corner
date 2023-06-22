import React from "react";
import Home from "components/Home";
import data from "data.json";
import Category from "components/Category";
import Form from "components/Form";
import "./styles.scss";

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
      <Form />
    </div>
  );
};

export default Main;
