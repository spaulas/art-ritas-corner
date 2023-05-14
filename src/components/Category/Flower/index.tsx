import React from "react";
import { flowers } from "./Imports";
import "./styles.scss";

export type FlowerProps = {
  id: number;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const Flower = ({ id, position }: FlowerProps) => {
  if (id < 1 || id > flowers.length) {
    return null;
  }

  return (
    <img
      className={`flower flower-${id} flower-${position}`}
      src={flowers[id - 1].src}
      alt={flowers[id - 1].alt}
    />
  );
};

export default Flower;
