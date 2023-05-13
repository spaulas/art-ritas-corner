import React from "react";
import flower01 from "assets/Flowers/flower01.png";
import flower02 from "assets/Flowers/flower02.png";
import flower03 from "assets/Flowers/flower03.png";
import flower04 from "assets/Flowers/flower04.png";
import flower05 from "assets/Flowers/flower05.png";
import flower06 from "assets/Flowers/flower06.png";

type FlowerProps = {
  id: number;
  position: "top-right" | "top-left" | "bottom-right" | "bottom-left";
};

const Flower = ({ id, position }: FlowerProps) => {
  const flowerValues = [
    { src: flower01, alt: "flower01" },
    { src: flower02, alt: "flower02" },
    { src: flower03, alt: "flower03" },
    { src: flower04, alt: "flower04" },
    { src: flower05, alt: "flower05" },
    { src: flower06, alt: "flower06" },
  ];

  if (id < 1 || id > flowerValues.length) {
    return null;
  }

  return (
    <img
      className={`flower flower-${id} flower-${position}`}
      src={flowerValues[id - 1].src}
      alt={flowerValues[id - 1].alt}
    />
  );
};

export default Flower;
