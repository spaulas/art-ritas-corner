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

  return (
    <div className="form-selector">
      <div
        className={isSelectedClassName("paintings")}
        onClick={() => handleChange("paintings")}
      >
        Peintures
      </div>
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
