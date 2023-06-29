import React, { useContext } from "react";
import { LanguageContext } from "components/LanguageProvider";
import type { Image } from "../..";
import "./styles.scss";
import Button from "components/common/Button";

/* TODO: Add click! */
const Description = ({ title, description, price }: Image) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="image-description">
      <div className="title">{title[language]}</div>
      <div className="description">{description[language]}</div>
      {price && <div className="price">{`${price}€`}</div>}
      <Button
        title="Calendrier"
        onClick={() => console.log("show calendar with the right settings")}
      />
    </div>
  );
};

export default Description;
