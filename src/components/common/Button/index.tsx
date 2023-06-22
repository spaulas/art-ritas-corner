import React from "react";
import "./styles.scss";

type ButtonProps = {
  title: string;
  onClick: () => void;
};

const Button = ({ title, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{title}</button>;
};

export default Button;
