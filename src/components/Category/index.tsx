import React from "react";

type Text = {
  fr: string;
  en: string;
};

type Image = {
  title: Text;
  description: Text;
  price?: number;
  duration?: number;
  src: string;
};

type Blob = {
  color: string;
  id: number;
};

type CategoryProps = {
  title: Text;
  description: Text;
  flower: number;
  images: Image[];
  blobs: Blob[];
};

const Category = ({
  title,
  description,
  flower,
  images,
  blobs,
}: CategoryProps) => {
  return <div>Category</div>;
};

export default Category;
