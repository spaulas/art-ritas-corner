import React from "react";
import "./styles.scss";

type ButtonProps = {
  title: string;
  id?: string;
  isDisabled?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void
};

const Button = ({ title, id, isDisabled, onClick, onMouseEnter }: ButtonProps) => {
  return (
    <button className={isDisabled ? "disabled" : ""} disabled={isDisabled} id={id} onClick={onClick} onMouseEnter={onMouseEnter}>
      {title}
    </button>
  );
};

export default Button;
