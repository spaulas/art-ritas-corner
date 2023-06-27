import React, { useState } from "react";
import "./styles.scss";

export type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label: string;
  options: Option[];
  value: string;
  onUpdate: (_value: string) => void;
  isDisabled?: boolean;
};

const Select = ({
  label,
  options,
  value,
  onUpdate,
  isDisabled,
}: SelectProps) => {
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnSelect = (newValue: string) => {
    console.log('handle on select! = ', newValue)
    onUpdate(newValue);
    setIsOpen(false);
    setHasError(false);
  };

  // TODO: handle click outside

  return (
    <div
      className={`dropdown-form-field ${isDisabled ? "disabled" : ""}`}
      onClick={() => setIsOpen(!isOpen && !isDisabled)}
    >
      <div className="dropdown-container">
        <div className={`dropdown-input ${isOpen || value ? "focus" : ""}`} />
        <label>
          <span>{label}</span>
          <span className="label-value">{value}</span>
        </label>
      </div>
      <div className={`dropdown-content ${isOpen ? "focus" : ""}`}>
        {options.map(({ label, value: _value }) => (
          <div
            className={`dropdown-option ${value === _value ? "active" : ""}`}
            onClick={() => handleOnSelect(_value)}
          >
            {label}
          </div>
        ))}
      </div>
      <span className={`dropdown-error ${hasError ? "visible" : ""}`}>
        * invalide
      </span>
    </div>
  );
};

export default Select;
