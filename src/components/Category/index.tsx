import React from "react";
import Title from "./Title";
import Flower from "./Flower";
import Images from "./Images";
import type { Text } from "./Title";
import type { FlowerProps } from "./Flower";
import type { TitleProps } from "./Title";
import type { Image as ImageType } from "./Images";
import "./styles.scss";

type Blob = {
  color: string;
  id: number;
};

type CategoryProps = {
  title: Text;
  description: Text;
  subCategory?: Text;
  titlePosition: string;
  flower: { id: number; position: string };
  images: ImageType[];
  blobs: Blob[];
};

const Category = ({
  title,
  description,
  subCategory,
  titlePosition,
  flower,
  images,
  blobs,
}: CategoryProps) => {
  return (
    <div className="category">
      <Title
        title={title}
        description={description}
        subCategory={subCategory}
        position={titlePosition as TitleProps["position"]}
      />
      <Images images={images} />
      <Flower
        id={flower.id}
        position={flower.position as FlowerProps["position"]}
      />
    </div>
  );
};

export default Category;
