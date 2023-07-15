import React, { useState } from "react";
import "./styles.scss";
import Button from "../Button";

type InputProps = {
  label: string;
  value: string;
  isSmall?: boolean;
  onUpdate: (value: string) => void;
};

type UploadedFiles = File & { src: string | ArrayBuffer | null };

const Input = ({ label, value, onUpdate }: InputProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFiles[]>([]);
  const [hasExceededLimit, setHasExceededLimit] = useState(false);
  const MAX_COUNT = 5;

  const handleFileUpload = (files: File[]) => {
    let limitExceeded = false;

    files.some((file) => {
      if (uploadedFiles.findIndex((f) => f.name === file.name) === -1) {
        if (uploadedFiles.length === MAX_COUNT - 1) {
          setHasExceededLimit(true);
        }

        if (uploadedFiles.length > MAX_COUNT - 1) {
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

          setUploadedFiles([...uploadedFiles, { ...file, src: imageSrc }]);
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
    const _uploadedFiles = [...uploadedFiles]
    _uploadedFiles.splice(index, 1)
    setUploadedFiles(_uploadedFiles)
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
          className={uploadedFiles.length === MAX_COUNT ? "disabled" :  ""}
        />

        <div className="photos-preview">
          {uploadedFiles.map((file, index) => {
            if (file.src) {
              return (
                <div className="photo-preview-image">
                  <Button title="x" onClick={() => removeImage(index)} />
                  <img alt={file.name} src={file.src.toString()} />
                </div>
              );
            }
            return <div>{file.name}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Input;
