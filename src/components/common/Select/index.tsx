import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";

export type Option = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

type SelectProps = {
  label: string;
  options: Option[];
  value: string;
  onUpdate: (_value: string) => void;
  isDisabled?: boolean;
  infoMessage?: string;
};

const Select = ({
  label,
  options,
  value,
  onUpdate,
  isDisabled,
  infoMessage,
}: SelectProps) => {
  const [hasError, setHasError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSelect = (_value: string, _isDisabled?: boolean) => {
    if (isDisabled) return;

    onUpdate(_value);
    setIsOpen(false);
    setHasError(false);
  };

  const getLabelFromValue = () => {
    const currentOption = options.find(({ value: _value }) => _value === value);
    return currentOption?.label;
  };

  return (
    <div
      className={`dropdown-form-field ${isDisabled ? "disabled" : ""}`}
      ref={menuRef}
    >
      <div
        className="dropdown-container"
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
      >
        {infoMessage ? (
          <div className="info-message-container">
            <div className="icon">i</div>
            <div className="message">{infoMessage}</div>
          </div>
        ) : null}
        <div className={`dropdown-input ${isOpen || value ? "focus" : ""}`} >
          <span className="dropdown-arrow">&#8964;</span>
        </div>
        <label>
          <span>{label}</span>
          <span className="label-value">{getLabelFromValue()}</span>
        </label>
      </div>
      <div className={`dropdown-content ${isOpen ? "focus" : ""}`}>
        {options.map(({ label, value: _value, isDisabled: _isDisabled }) => (
          <div
            key={_value}
            className={`dropdown-option ${value === _value ? "active" : ""} ${
              _isDisabled ? "disabled" : ""
            }`}
            onClick={() => handleOnSelect(_value, _isDisabled)}
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
