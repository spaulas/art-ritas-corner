import React, { useContext } from "react";
import { LanguageContext } from "context/LanguageProvider";
// TODO: remove this after the images are stored correctly
import * as images from "components/ImagesExports";
import classNames from "classnames";
import "./styles.scss";
import Description from "./Description";
import { ImageType } from "data";
import { BasicFormFields } from "context/FormProvider";

// TODO: remove after using images links!
const tempHelper: Record<string, string> = {...images}

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
      <img src={tempHelper[image.src]} alt={image.title?.[language] ?? image.id} />
      <Description {...image} formName={formName} categoryID={categoryID} hasOpenButton={formName === "paintings"} />
    </div>
  );
};

export default Card;
