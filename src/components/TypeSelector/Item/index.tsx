import React from "react";
import nailsIcon from "assets/Icons/nails.png";
import paintingsIcon from "assets/Icons/paintings.png";
import "../styles.scss";

type TypeItemProps = {
  title: string;
  icon: "paintings" | "nails";
  isActive: boolean;
  onClick: () => void;
};

const TypeItem = (props: TypeItemProps) => {
  const { title, icon, isActive, onClick } = props;

  const getIcon = () => {
    if (icon === "paintings") {
      return paintingsIcon;
    }
    return nailsIcon;
  };

  return (
    <div
      className={`type-selector__item ${
        isActive ? "type-selector__item--active" : ""
      }`}
      onClick={onClick}
    >
      <img src={getIcon()} alt={title} />
      <h5>{title}</h5>
    </div>
  );
};

export default TypeItem;
