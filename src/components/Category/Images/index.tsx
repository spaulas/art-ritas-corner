import React, { useRef, useState, useEffect } from "react";
import type { Text } from "../Title";
import "./styles.scss";

import classNames from "classnames";
import Card from "./Card";

export type Image = {
  title: Text;
  description: Text;
  price?: number;
  duration?: number;
  src: string;
};

type ImageProps = {
  images: Image[];
  isHoverRight: boolean;
};

const Images = ({ images, isHoverRight }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);

  const isSliding = useRef(false);
  const startX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const IMAGES_VISIBLE_ON_HOVER = 4;

  const hoverImages = [...images].slice(0, IMAGES_VISIBLE_ON_HOVER);
  const currentImages = isOpen ? images : hoverImages;

  useEffect(() => {
    const onScroll = () => {
      setIsOpen(false);
      setMarginLeft(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseDown = (e: any) => {
    if (!isOpen) return;

    isSliding.current = true;
    startX.current = e.pageX + marginLeft / -3;
  };

  const handleOnMouseLeave = () => {
    if (!isOpen) return;
    isSliding.current = false;
  };

  const handleMouseUp = () => {
    if (!isOpen) return;
    isSliding.current = false;
  };

  const handleOnMouseMove = (e: any) => {
    if (!isOpen || !isSliding.current) return;

    e.preventDefault();

    let _marginLeft = (e.pageX - startX.current) * 3;
    if (_marginLeft > 0) {
      _marginLeft = 0;
    } else if (
      containerRef?.current &&
      _marginLeft < containerRef.current.clientWidth / -2
    ) {
      _marginLeft = containerRef.current.clientWidth / -2;
    }

    setMarginLeft(_marginLeft);
  };

  const imagesClassName = classNames(
    "images-slider",
    `container-width-${currentImages.length}`,
    {
      "hover-right": !isOpen && isHoverRight,
      "hover-left": !isOpen && !isHoverRight,
      "open-right": isOpen && isHoverRight,
      "open-left": isOpen && !isHoverRight,
      active: isSliding.current,
    }
  );

  return (
    <div
      className="images-container"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleOnMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleOnMouseMove}
    >
      <div
        ref={containerRef}
        className={imagesClassName}
        onClick={() => setIsOpen(true)}
        style={{ marginLeft }}
      >
        {currentImages.map((image, index) => (
          <Card
            image={image}
            zIndex={IMAGES_VISIBLE_ON_HOVER - index}
            isOpen={isOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
