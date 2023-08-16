import { DataType } from "data";
import React from "react";
import data from "data.json";
import Category from "./Category";
import "./styles.scss";

const NailsTC = () => {
  const renderNailsCategory = () => {
    return Object.values((data as unknown as DataType).nailsTC.categories).map(
      (category, index) => (
        <Category key={`nails-tc-category-${index}`} {...category} />
      )
    );
  };

  return (
    <div className="nails-tc-container">
      <div className="nails-tc-categories">{renderNailsCategory()}</div>
    </div>
  );
};

export default NailsTC;
