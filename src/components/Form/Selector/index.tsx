import React, { useContext } from "react";
import { BasicFormFields, FormContext } from "context/FormProvider";
import "./styles.scss";

const FormSelector = () => {
  const { basicFields, updateBasicFields } = useContext(FormContext);

  const handleChange = (type: BasicFormFields["type"]) => {
    updateBasicFields({ type });
  };

  const isSelectedClassName = (currentType: BasicFormFields["type"]): string =>
    currentType === basicFields.type ? "form-selector-current" : "";

  if (basicFields.type === "paintings") return <div className="form-selector--empty"/>;

  return (
    <div className="form-selector">
      <div
        className={isSelectedClassName("nails")}
        onClick={() => handleChange("nails")}
      >
        Ongles
      </div>
      <div
        className={isSelectedClassName("nailsPrices")}
        onClick={() => handleChange("nailsPrices")}
      >
        Prix des Ongles
      </div>
      <div
        className={isSelectedClassName("nailsTC")}
        onClick={() => handleChange("nailsTC")}
      >
        T&C
      </div>
    </div>
  );
};

export default FormSelector;
