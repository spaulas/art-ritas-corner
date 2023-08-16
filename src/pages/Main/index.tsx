import React, { useContext } from "react";

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
import { FormContext } from "context/FormProvider";

const Main = () => {
  const {
    basicFields,
  } = useContext(FormContext);

  const renderCategories = () => {
    const currentType = basicFields.type === "paintings" ? "paintings" : "nails"

    return Object.values((data as unknown as DataType).categories[currentType]).map((category) => (
      <Category
        key={category.id}
        formName={currentType}
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
