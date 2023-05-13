import React, { useContext, useState } from "react";
import { LanguageContext } from "components/LanguageProvider";
import type { Text } from "../Title";

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

const Images = ({ images }: ImageProps) => {
  const { language } = useContext(LanguageContext);

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div>
      {images.map((image) => (
        <img
          key={image.src}
          src={tempHelper[image.src]}
          alt={image.title[language]}
        />
      ))}
    </div>
  );
};

export default Images;
