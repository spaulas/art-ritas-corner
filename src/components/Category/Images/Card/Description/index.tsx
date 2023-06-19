import React, { useContext } from "react";
import { LanguageContext } from "components/LanguageProvider";
import type { Image } from "../..";
import "./styles.scss";

const Description = ({title, description, price}: Image) => {
  const { language } = useContext(LanguageContext);

  return <div className="image-description">
        <div className="title">{title[language]}</div>
        <div className="description">{description[language]}</div>
        {price && <div className="price">{`${price}€`}</div>}
        <button>Calendrier</button>
    </div>
}

export default Description