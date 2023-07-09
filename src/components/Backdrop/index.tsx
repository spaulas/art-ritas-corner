import React, { useContext } from "react";
import { BackdropContext } from "context/BackdropProvider";
import data from "data.json";
import "./styles.scss";

const Backdrop = () => {
  const { isBackdropVisible } = useContext(BackdropContext);

  return (
    <div
      className={`backdrop ${isBackdropVisible ? "backdrop--visible" : ""}`}
      style={{ minHeight: `calc(100vh * ${data.categories.length + 3})` }}
    />
  );
};

export default Backdrop;
