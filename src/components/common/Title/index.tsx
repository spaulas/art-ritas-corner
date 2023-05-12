import React from "react";
import "./styles.scss";

type TitleProps = {
  title: string;
  description: string;
};

const Title = ({ title, description }: TitleProps) => {
  return (
    <div className="title-container">
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default Title;
