import { NailsPrices } from "data"
import React, {  useContext } from "react";
import { LanguageContext } from "context/LanguageProvider";

const NailsPriceItem = ({serviceName, price}: NailsPrices) => {
  const { language } = useContext(LanguageContext);

  return <div className="nails-price-item">
        <span>{serviceName[language]}</span>
        <span>{typeof price === "number" ? price : price[language]}</span>
    </div>
}

export default NailsPriceItem