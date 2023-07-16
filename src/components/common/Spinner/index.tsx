import React from "react";
import "./styles.scss"

type SpinnerProps = {
  title?: string;
};

const Spinner = (props: SpinnerProps) => {
  const { title } = props;

  return (
    <div className="spinner">
      <div className="spinner__animation" ></div>
      {title ? <span className="spinner__title">{title}</span> : null}
    </div>
  );
};

export default Spinner;
