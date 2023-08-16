import React from "react";
import Paragraph from "components/common/Paragraph";
import { CategoryType } from "data";
import "./styles.scss";

type ParagraphsProps = {
  paragraphs: CategoryType["paragraphs"];
};

const Paragraphs = (props: ParagraphsProps) => {
  const { paragraphs } = props;

  if (!paragraphs) return null;

  const renderNailsParagraphs = () => {
    return paragraphs?.map((paragraph, index) => (
      <Paragraph key={`category-paragraph-${index}`} text={paragraph} />
    ));
  };

  return <div className="category-paragraphs">{renderNailsParagraphs()}</div>;
};

export default Paragraphs;
