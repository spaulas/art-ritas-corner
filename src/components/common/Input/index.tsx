import React from "react";
import "./styles.scss";

type InputProps = {
  label: string;
};

const Input = ({ label }: InputProps) => {
  return (
    <div className="input-container">
      <input type="text" name="text" autoComplete="off" required />
      <label htmlFor="text">
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Input;
