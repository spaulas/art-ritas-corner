import React, { useContext } from "react";
import { LanguageContext } from "context/LanguageProvider";
import "./styles.scss";
import Button from "components/common/Button";
import { BasicFormFields, FormContext } from "context/FormProvider";
import { ImageType } from "data";

type DescriptionProps = {
  categoryID: string;
  hasOpenButton?: boolean;
  formName: BasicFormFields["type"];
} & ImageType;

// TODO: create open
const Description = ({
  categoryID,
  id,
  title,
  description,
  price,
  hasOpenButton,
  formName,
}: DescriptionProps) => {
  const { language } = useContext(LanguageContext);
  const { updateBasicFields, updateNailsFields, updatePaintingsFields } = useContext(FormContext);

  const onScheduleClick = () => {
    updateBasicFields({
      type: "nails",
    });
    updateNailsFields({ service: id });
    document.getElementById("form-page")?.scrollIntoView();
  };

  const onContactClick = () => {
    updateBasicFields({
      type: "paintings",
    });
    updatePaintingsFields({ category: categoryID, painting: id });
    document.getElementById("form-page")?.scrollIntoView();
  };

  return (
    <div className="image-description" id="image-description">
      <div className="title" id="image-description__title">
        {title[language]}
      </div>
      <div className="description" id="image-description__description">
        {description[language]}
      </div>
      {price && (
        <div className="price" id="image-description__price">{`${price}€`}</div>
      )}
      {hasOpenButton && (
        <Button
          id="image-description__open"
          title="Ouvrir"
          onClick={() => console.log("open details")}
        />
      )}
      {formName === "nails" && (
        <Button
          id="image-description__schedule"
          title="Calendrier"
          onClick={onScheduleClick}
        />
      )}
      {formName === "paintings" && (
        <Button
          id="image-description__contact"
          title="Contact"
          onClick={onContactClick}
        />
      )}
    </div>
  );
};

export default Description;
