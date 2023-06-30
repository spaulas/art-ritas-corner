import React, { useContext } from "react";
import { LanguageContext } from "context/LanguageProvider";
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
import classNames from "classnames";
import "./styles.scss";
import Description from "./Description";
import { ImageType } from "data";
import { BasicFormFields } from "context/FormProvider";

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

type CardProps = {
  categoryID: string;
  image: ImageType;
  isOpen: boolean;
  isSliding: boolean;
  zIndex?: number;
  formName: BasicFormFields["type"];
};

const Card = ({
  image,
  isOpen,
  isSliding,
  zIndex = 1,
  formName,
  categoryID,
}: CardProps) => {
  const { language } = useContext(LanguageContext);

  const className = classNames("image-card", { opened: isOpen && !isSliding });

  return (
    <div key={image.id} className={className} style={{ zIndex }}>
      <img src={tempHelper[image.src]} alt={image.title[language]} />
      <Description {...image} formName={formName} categoryID={categoryID} />
    </div>
  );
};

export default Card;
