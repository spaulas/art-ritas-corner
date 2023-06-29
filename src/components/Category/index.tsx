import React from "react";
import Title from "./Title";
import Flower from "./Flower";
import Images from "./Images";
import Blobs from "./Blobs";
import type { FlowerProps } from "./Flower";
import type { TitleProps } from "./Title";
import type { CategoryType } from "data";
import "./styles.scss";

const Category = ({
  title,
  description,
  subCategory,
  titlePosition,
  flower,
  images,
  blobs,
}: CategoryType) => {
  const isTitleRight = titlePosition.includes("right");
  return (
    <div className={`category ${isTitleRight ? "invert" : ""}`}>
      <Title
        title={title}
        description={description}
        subCategory={subCategory}
        position={titlePosition as TitleProps["position"]}
      />
      <div
        className={`images-with-blobs ${
          titlePosition.includes("bottom") ? "bottom" : ""
        } `}
      >
        <Blobs blobs={blobs} />
        <Images images={images} isHoverRight={isTitleRight} />
      </div>
      <Flower
        id={flower.id}
        position={flower.position as FlowerProps["position"]}
      />
    </div>
  );
};

export default Category;
