/* eslint-disable no-control-regex */
import React, { useState } from "react";
import "./styles.scss";

type InputProps = {
  label: string;
  value: string;
  type: "text" | "email" | "phone";
  onUpdate: (value: string) => void;
};

const Input = ({ label, value, type, onUpdate }: InputProps) => {
  const [hasError, setHasError] = useState(false);

  const onChange = (newValue: string) => {
    onUpdate(newValue);

    switch (type) {
      case "email":
        if (validateEmail(newValue)) {
          setHasError(true);
          return;
        }
        break;
      case "phone":
        if (validatePhone(newValue)) {
          setHasError(true);
          return;
        }
        break;
      case "text":
      default:
        if (validateText(newValue)) {
          setHasError(true);
          return;
        }
        break;
    }

    setHasError(false);
  };

  const validateText = (text: string): boolean => {
    const TEXT_REGEX = new RegExp(/^[A-Za-z]{3,}$/);
    return !TEXT_REGEX.test(text);
  };

  const validateEmail = (email: string): boolean => {
    const EMAIL_REGEX = new RegExp(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
    );
    return !EMAIL_REGEX.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const PHONE_REGEX = new RegExp(/^[0-9]{9,}$/);
    return !PHONE_REGEX.test(phone);
  };

  return (
    <div className="input-form-field">
      <div className="input-container">
        <input
          type="text"
          name="text"
          autoComplete="off"
          required
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
        <label htmlFor="text">
          <span>{label}</span>
        </label>
      </div>
      {
        <span className={`input-error ${hasError ? "visible" : ""}`}>
          * invalide
        </span>
      }
    </div>
  );
};

export default Input;
