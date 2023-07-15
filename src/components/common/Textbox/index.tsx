import React, {useState} from "react";
import "./styles.scss";

type InputProps = {
  label: string;
  value: string;
  isSmall?: boolean
  onUpdate: (value: string) => void;
};

const Input = ({ label, value, isSmall, onUpdate }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={`textarea-form-field ${isSmall ? "textarea-small" : ""} ${isSmall && isFocused ? "textarea-small---focused" : ""}`}>
      <div className="textarea-container">
        <textarea
          name="text"
          autoComplete="off"
          required
          onChange={(e) => onUpdate(e.target.value)}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <label htmlFor="text">
          <span>{label}</span>
        </label>
      </div>
    </div>
  );
};

export default Input;
