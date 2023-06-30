import React from "react";
import { blobValues } from "./Imports";
import type { BlobType } from "data";
import "./styles.scss";

type BlobsProps = {
  blobs: BlobType[];
};

const Blobs = ({ blobs }: BlobsProps) => {
  const firstBlob = blobValues[blobs[0].color][blobs[0].id];
  const secondBlob = blobValues[blobs[1].color][blobs[1].id];

  const getClassName = ({ angle, size }: BlobType) => {
    return `${angle ? `angle-${angle}` : "angle-0"} ${
      size ? `size-${size}` : ""
    }`;
  };

  return (
    <div className="blobs-container">
      <img
        className={getClassName(blobs[0])}
        src={firstBlob.src}
        alt={firstBlob.alt}
      />
      <img
        className={getClassName(blobs[1])}
        src={secondBlob.src}
        alt={secondBlob.alt}
      />
    </div>
  );
};

export default Blobs;
