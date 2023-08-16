import React from "react";
import Title from "./Title";
import Flower from "./Flower";
import Images from "./Images";
import Blobs from "./Blobs";
import type { FlowerProps } from "./Flower";
import type { TitleProps } from "./Title";
import type { CategoryType } from "data";
import { BasicFormFields } from "context/FormProvider";
import "./styles.scss";
import Paragraphs from "./Paragraphs";

type CategoryProps = {
  formName: BasicFormFields["type"];
} & CategoryType;

const Category = ({
  id,
  title,
  description,
  subCategory,
  titlePosition,
  flower,
  images,
  blobs,
  paragraphs,
  formName,
}: CategoryProps) => {
  const isTitleRight = titlePosition.includes("right");

  return (
    <div
      className={`category ${isTitleRight ? "invert" : ""} ${
        !images && !blobs && paragraphs ? "column" : ""
      }`}
    >
      <Title
        title={title}
        description={description}
        subCategory={subCategory}
        position={titlePosition as TitleProps["position"]}
      />
      {paragraphs ? <Paragraphs paragraphs={paragraphs} /> : null}
      {images ? (
        <div
          className={`images-with-blobs ${
            titlePosition.includes("bottom") ? "bottom" : ""
          } ${isTitleRight ? "left" : ""} `}
        >
          {blobs ? <Blobs blobs={blobs} /> : null}
          <Images
            categoryID={id}
            images={images}
            isHoverRight={isTitleRight}
            formName={formName}
          />
        </div>
      ) : null}
      <Flower
        id={flower.id}
        position={flower.position as FlowerProps["position"]}
      />
    </div>
  );
};

export default Category;
