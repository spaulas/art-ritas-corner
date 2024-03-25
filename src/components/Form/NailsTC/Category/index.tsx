import React, { useContext } from "react";
import type { TCCategory as TCCategoryProps } from "data.d";
import { LanguageContext } from "context/LanguageProvider";

const TCCategory = ({ title, description, bulletPoints }: TCCategoryProps) => {
  const { language } = useContext(LanguageContext);

  const renderCategoryRanges = () =>
    bulletPoints?.map((range) => (
      <li className="nails-tc-category-range">{range[language]}</li>
    ));

  return (
    <div className="nails-tc-category">
      <div className="nails-tc-category-title">{title[language]}</div>
      {description && (
        <div className="nails-tc-category-description">
          {description[language]}
        </div>
      )}
      <div className="nails-tc-category-bulletPoints-container">
        {renderCategoryRanges()}
      </div>
    </div>
  );
};

export default TCCategory;
