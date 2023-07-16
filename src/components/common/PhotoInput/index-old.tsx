import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";

type InputProps = {
  label: string;
  value: string[];
  isSmall?: boolean;
  onUpdate: (value: string[]) => void;
};

const Input = ({ label, value, onUpdate }: InputProps) => {
  const [hasExceededLimit, setHasExceededLimit] = useState(false);
  const MAX_COUNT = 5;

  const handleFileUpload = (files: File[]) => {
    let limitExceeded = false;

    files.some((file) => {
      // TODO: change this confirmation to bellow
      if (value.findIndex((f) => f === file.name) === -1) {
        if (value.length === MAX_COUNT - 1) {
          setHasExceededLimit(true);
        }

        if (value.length > MAX_COUNT - 1) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setHasExceededLimit(false);
          limitExceeded = true;
          return true;
        }
      }

      if (!limitExceeded) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const imageSrc = reader.result;

          onUpdate([...value, imageSrc?.toString() ?? ""]);
        };
      }

      return true;
    });
  };

  const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const choosenFiles = Array.prototype.slice.call(e.target.files);
    handleFileUpload(choosenFiles);
  };

  const removeImage = (index: number) => {
    const _value = [...value];
    _value.splice(index, 1);
    onUpdate(_value);
  };

  return (
    <div className="photo-form-field">
      <div className="photo-container">
        <label htmlFor="text">
          <span>{label}</span>
        </label>
        <input
          type="file"
          title=""
          accept="application/png application/jpg application/jpeg"
          onChange={onFileUpload}
          disabled={hasExceededLimit}
          className={value.length === MAX_COUNT ? "disabled" : ""}
        />

        <div className="photos-preview">
          {value.map((file, index) => {
            if (file) {
              return (
                <div className="photo-preview-image">
                  <Button title="x" onClick={() => removeImage(index)} />
                  <img alt={file} src={file} />
                </div>
              );
            }
            return <div>{file}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Input;
