import React, { useContext } from "react";
import { LanguageContext } from "components/LanguageProvider";
import "./styles.scss";
import Button from "components/common/Button";
import { FormContext } from "context/FormProvider";
import { ImageType } from "data";

type DescriptionProps = {
  hasOpenButton?: boolean;
} & ImageType;

/* TODO: Add click! */
const Description = ({
  id,
  title,
  description,
  price,
  hasOpenButton,
}: DescriptionProps) => {
  const { language } = useContext(LanguageContext);
  const { updateBasicFields, updateNailsFields } = useContext(FormContext);

  const onScheduleClick = () => {
    updateBasicFields({
      type: "nails",
    });
    updateNailsFields({ service: id });
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
      <Button
        id="image-description__schedule"
        title="Calendrier"
        onClick={onScheduleClick}
      />
    </div>
  );
};

export default Description;
