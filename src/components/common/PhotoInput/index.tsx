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
  const MAX_WIDTH = 160;
  const MAX_HEIGHT = 90;
  const QUALITY = 0.2;
  const MIME_TYPE = "image/jpeg";

  const handleFileUpload = (files: File[]) => {
    let limitExceeded = false;

    files.some((file) => {
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
        const blobURL = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onerror = function () {
          URL.revokeObjectURL(this.src);
          // TODO: Handle the failure properly
          alert("Cannot load image");
        };

        img.onload = function () {
          URL.revokeObjectURL(img.src);
          const [newWidth, newHeight] = calculateSize(img);
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, newWidth, newHeight);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                // TODO: create server to upload images correctly!!!!
                const imageUrl = URL.createObjectURL(blob);
                onUpdate([...value, imageUrl]);
              }
            },
            MIME_TYPE,
            QUALITY
          );
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

  const calculateSize = (img: HTMLImageElement) => {
    let width = img.width;
    let height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width);
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width = Math.round((width * MAX_HEIGHT) / height);
        height = MAX_HEIGHT;
      }
    }
    return [width, height];
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
          {value.map((src, index) => {
            if (src) {
              return (
                <div className="photo-preview-image">
                  <Button title="x" onClick={() => removeImage(index)} />
                  <img alt={src} src={src} />
                </div>
              );
            }
            return <div>{src}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Input;
