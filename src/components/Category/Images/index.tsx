import React, { useContext, useState } from "react";
import { LanguageContext } from "components/LanguageProvider";
import type { Text } from "../Title";
import "./styles.scss";

// TODO: remove this after the images are stored correctly
import {
  nails01,
  nails02,
  nails03,
  mandala01,
  abstract01,
  body01,
  body02,
  body03,
  body04,
} from "components/ImagesExports";

export type Image = {
  title: Text;
  description: Text;
  price?: number;
  duration?: number;
  src: string;
};

type ImageProps = {
  images: Image[];
  isOpenRight: boolean;
};

// TODO: remove after using images links!
const tempHelper: Record<string, string> = {
  nails01,
  nails02,
  nails03,
  mandala01,
  abstract01,
  body01,
  body02,
  body03,
  body04,
};

const Images = ({ images, isOpenRight }: ImageProps) => {
  const { language } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);

  const IMAGES_VISIBLE_ON_HOVER = 4;

  const hoverImages = [...images].slice(0, IMAGES_VISIBLE_ON_HOVER);
  const clickImages = [...images].slice(IMAGES_VISIBLE_ON_HOVER, images.length);

  console.log("isOpenRight = ", isOpenRight);

  return (
    <div className="images-container">
      <div
        className={`hover-images ${isOpenRight ? "open-right" : "open-left"}`}
        onClick={() => setIsOpen(true)}
      >
        {hoverImages.map((image, index) => (
          <div
            key={image.src}
            className="image-display"
            style={{ zIndex: IMAGES_VISIBLE_ON_HOVER - index }}
          >
            <img src={tempHelper[image.src]} alt={image.title[language]} />
          </div>
        ))}
      </div>
      {clickImages && isOpen ? (
        <div className="click-images">
          {clickImages.map((image) => (
            <div key={image.src} className="image-display">
              <img src={tempHelper[image.src]} alt={image.title[language]} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Images;
