import React from "react";

import Home from "components/Home";
import data from "data.json";
import Category from "components/Category";
import Form from "components/Form";
import About from "components/About";
import "./styles.scss";
import { LinesColumns } from "components/LinesColumns";
import type { DataType } from "data.d";
import Backdrop from "components/Backdrop";
import WelcomeModal from "components/WelcomeModal";
import TypeSelector from "components/TypeSelector";

const Main = () => {
  const renderCategories = () => {
    return Object.values((data as DataType).categories).map((category) => (
      <Category
        key={category.id}
        formName={category.id === "nailArt" ? "nails" : "paintings"}
        {...category}
      />
    ));
  };

  return (
    <>
      <div className="main-page">
        <Home />
        {renderCategories()}
        <Form />
        <About profileText={(data.profile as DataType["profile"]).text} />
        <LinesColumns />
      </div>
      <Backdrop />
      <TypeSelector />
      <WelcomeModal />
    </>
  );
};

export default Main;
