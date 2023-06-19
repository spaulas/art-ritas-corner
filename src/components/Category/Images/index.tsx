import React, { useState } from "react";
import type { Text } from "../Title";
import "./styles.scss";

import classNames from "classnames";
import Card from "./Card";

export type Image = {
  title: Text;
  description: Text;
  price?: number;
  duration?: number;
  src: string;
};

type ImageProps = {
  images: Image[];
  isHoverRight: boolean;
};

const Images = ({ images, isHoverRight }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const IMAGES_VISIBLE_ON_HOVER = 4;

  const hoverImages = [...images].slice(0, IMAGES_VISIBLE_ON_HOVER);
  const clickImages = [...images].slice(IMAGES_VISIBLE_ON_HOVER, images.length);

  const hoverImagesClassName = classNames("hover-images", {
    "hover-right": !isOpen && isHoverRight,
    "hover-left": !isOpen && !isHoverRight,
    "open-right": isOpen && isHoverRight,
    "open-left": isOpen && !isHoverRight
  });
  const clickImagesClassName = classNames("click-images", {
    "open-right": isOpen && isHoverRight,
    "open-left": isOpen && !isHoverRight
  });

  return (
    <div className="images-container">
      <div className={hoverImagesClassName} onClick={() => setIsOpen(true)}>
        {hoverImages.map((image, index) => (
          <Card image={image} zIndex={IMAGES_VISIBLE_ON_HOVER - index} isOpen={isOpen} />
        ))}
      </div>
      {clickImages && isOpen ? (
        <div className={clickImagesClassName}>
          {clickImages.map((image) => (
            <Card image={image} isOpen={isOpen}  />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Images;
