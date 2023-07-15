import React from "react";
import "./styles.scss";

type ButtonProps = {
  title: string;
  id?: string;
  isDisabled?: boolean;
  isDark?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
};

const Button = ({
  title,
  id,
  isDisabled,
  isDark,
  onClick,
  onMouseEnter,
}: ButtonProps) => {
  return (
    <button
      className={`${isDark ? "dark" : ""} ${isDisabled ? "disabled" : ""}`}
      disabled={isDisabled}
      id={id}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {title}
    </button>
  );
};

export default Button;
