import React from "react";
import "./styles.scss";

type InputProps = {
  label: string;
  value: string;
  onUpdate: (value: string) => void;
};

const Input = ({ label, value, onUpdate }: InputProps) => {
  return (
    <div className="textarea-form-field">
      <div className="textarea-container">
        <textarea
          name="text"
          autoComplete="off"
          required
          onChange={(e) => onUpdate(e.target.value)}
          value={value}
        />
        <label htmlFor="text">
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default Input;
