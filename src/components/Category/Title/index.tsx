import React, { useContext } from "react";
import { LanguageContext } from "components/LanguageProvider";
import "./styles.scss";

export type Text = {
  fr: string;
  en: string;
};

export type TitleProps = {
  subCategory?: Text;
  title: Text;
  description: Text;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const Title = ({ title, description, subCategory, position }: TitleProps) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className={`title-container ${position}`}>
      {subCategory ? <p>{subCategory[language]}</p> : null}
      <h1>{title[language]}</h1>
      <h5>{description[language]}</h5>
    </div>
  );
};

export default Title;
