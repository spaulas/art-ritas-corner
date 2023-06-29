import React from "react";
import "./styles.scss";

type ButtonProps = {
  title: string;
  id?: string;
  onClick: () => void;
  onMouseEnter?: () => void
};

const Button = ({ title, id, onClick, onMouseEnter }: ButtonProps) => {
  return (
    <button id={id} onClick={onClick} onMouseEnter={onMouseEnter}>
      {title}
    </button>
  );
};

export default Button;
