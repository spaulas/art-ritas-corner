import React, { useContext, useState } from "react";
import { LanguageContext } from "components/LanguageProvider";
import type { Text } from "../Title";
import "./styles.scss";

// TODO: remove this after the images are stored correctly
import {
  nails01,
  nails02,
  nails03,
  nails04,
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
};

// TODO: remove after using images links!
const tempHelper: Record<string, string> = {
  nails01,
  nails02,
  nails03,
  nails04,
  mandala01,
  abstract01,
  body01,
  body02,
  body03,
  body04,
};

const Images = ({ images }: ImageProps) => {
  const { language } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);

  const IMAGES_VISIBLE_ON_HOVER = 4;

  const hoverImages = [...images].slice(0, IMAGES_VISIBLE_ON_HOVER);
  const clickImages = [...images].slice(IMAGES_VISIBLE_ON_HOVER, images.length);

  return (
    <div className="images-container">
      <div className="hover-images" onClick={() => setIsOpen(true)}>
        {hoverImages.map((image) => (
          <div className="image-display">
            <img
              key={image.src}
              src={tempHelper[image.src]}
              alt={image.title[language]}
            />
          </div>
        ))}
      </div>
      {clickImages && isOpen ? (
        <div className="click-images">
          {clickImages.map((image) => (
            <img
              key={image.src}
              src={tempHelper[image.src]}
              alt={image.title[language]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Images;
