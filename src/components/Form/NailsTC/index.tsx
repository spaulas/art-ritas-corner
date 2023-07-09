import { DataType } from "data";
import React from "react";
import data from "data.json";
import Paragraph from "./Paragraph";
import Category from "./Category";
import "./styles.scss";

const NailsTC = () => {
  const renderNailsParagraphs = () => {
    return Object.values((data as DataType).nailsTC.paragraphs).map(
      (paragraph, index) => (
        <Paragraph key={`nails-tc-paragraph-${index}`} text={paragraph} />
      )
    );
  };

  const renderNailsCategory = () => {
    return Object.values((data as DataType).nailsTC.categories).map(
      (category, index) => (
        <Category key={`nails-tc-category-${index}`} {...category} />
      )
    );
  };

  return (
    <div className="nails-tc-container">
      <div className="nails-tc-paragraphs">{renderNailsParagraphs()}</div>
      <div className="nails-tc-categories">{renderNailsCategory()}</div>
    </div>
  );
};

export default NailsTC;
