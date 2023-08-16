import React, { useContext } from "react";
import TypeItem from "./Item";
import "./styles.scss";
import { BasicFormFields, FormContext } from "context/FormProvider";

const TypeSelector = () => {
  const { basicFields, updateBasicFields } = useContext(FormContext);

  const handleOnChange = (newType: BasicFormFields["type"]) => {
    updateBasicFields({ type: newType });
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="type-selector">
      <TypeItem
        title="Peintures"
        icon="paintings"
        isActive={basicFields.type === "paintings"}
        onClick={() => handleOnChange("paintings")}
      />
      <TypeItem
        title="Ongles"
        icon="nails"
        isActive={basicFields.type.includes("nails")}
        onClick={() => handleOnChange("nails")}
      />
    </div>
  );
};

export default TypeSelector;
