import React, { useContext } from "react";
import { BackdropContext } from "context/BackdropProvider";
import data from "data.json";
import "./styles.scss";
import { FormContext } from "context/FormProvider";

const Backdrop = () => {
  const { isBackdropVisible } = useContext(BackdropContext);
  const { basicFields } = useContext(FormContext);

  return (
    <div
      id="backdrop"
      className={`backdrop ${isBackdropVisible ? "backdrop--visible" : ""}`}
      style={{
        minHeight: `calc(100vh * ${
          data.categories[
            basicFields.type === "paintings" ? "paintings" : "nails"
          ].length + 3
        })`,
      }}
    />
  );
};

export default Backdrop;
