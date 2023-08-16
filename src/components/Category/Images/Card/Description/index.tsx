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

const Description = ({
  categoryID,
  id,
  title,
  description,
  link,
  price,
  hasOpenButton,
  formName,
}: DescriptionProps) => {
  const { language } = useContext(LanguageContext);
  const { updateBasicFields, updateNailsFields, updatePaintingsFields } =
    useContext(FormContext);

  const onOpen = () => {
    window.open(link);
  };

  const onScheduleClick = () => {
    updateBasicFields({
      type: "nails",
    });
    updateNailsFields({ services: [id] });
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
        {title?.[language]}
      </div>
      {description ? (
        <div className="description" id="image-description__description">
          {description?.[language]}
        </div>
      ) : null}
      {price && (
        <div className="price" id="image-description__price">{`${price}€`}</div>
      )}
      <div className={`actions ${!title && !description ? "lonely" : ""}`}>
        {hasOpenButton && link && (
          <Button
            id="image-description__open"
            title="Ouvrir"
            onClick={onOpen}
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
    </div>
  );
};

export default Description;
