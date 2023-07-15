import React from "react";
import "./styles.scss";

type CheckboxProps = {
  id: string;
  label: string;
  value?: boolean;
  onChange: (value: boolean) => void;
};

const Checkbox = ({ id, label, value, onChange }: CheckboxProps) => {
  return (
    <div className="checkbox-form-field">
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
