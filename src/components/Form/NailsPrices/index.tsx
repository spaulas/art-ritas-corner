import React from "react";
import data from "data.json";
import { DataType } from "data";
import NailsPriceItem from "./NailsPriceItem";
import "./styles.scss";

const NailsPrices = () => {
  const renderNailsPrices = () => {
    return Object.values((data as DataType).nailsPrices).map((nailsPrice) => (
      <NailsPriceItem key={nailsPrice.id} {...nailsPrice} />
    ));
  };

  return <div className="nails-prices-container">{renderNailsPrices()}</div>;
};

export default NailsPrices;
