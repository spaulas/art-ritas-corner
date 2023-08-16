import React, { useContext } from "react";
import TypeItem from "./Item";
import "./styles.scss";
import { FormContext } from "context/FormProvider";

const TypeSelector = () => {
  const { basicFields, updateBasicFields } = useContext(FormContext);

  return (
    <div className="type-selector">
      <TypeItem
        title="Peintures"
        icon="paintings"
        isActive={basicFields.type === "paintings"}
        onClick={() => updateBasicFields({ type: "paintings" })}
      />
      <TypeItem
        title="Ongles"
        icon="nails"
        isActive={basicFields.type.includes("nails")}
        onClick={() => updateBasicFields({ type: "nails" })}
      />
    </div>
  );
};

export default TypeSelector;
