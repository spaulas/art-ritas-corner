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
  const SLIDING_LIMIT_OFFSET = 180;
  const SLIDING_SPEED = 3;

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

  const calculateSlidingDistance = (e: any): number => {
    const _marginLeft = (e.pageX - startX.current) * SLIDING_SPEED;

    const rightMaxSlide = containerRef.current
      ? containerRef.current.clientWidth / -2 + SLIDING_LIMIT_OFFSET
      : 0;
    const leftMaxSlide = containerRef.current
      ? (SLIDING_LIMIT_OFFSET / 3) * 2
      : 0;

    const isAtStart =
      (isHoverRight && _marginLeft > 0) || (!isHoverRight && _marginLeft < 0);

    const isAtEnd =
      (isHoverRight && _marginLeft < rightMaxSlide) ||
      (!isHoverRight && _marginLeft > leftMaxSlide);
    if (isAtStart) {
      return 0;
    }

    if (isAtEnd && containerRef.current) {
      return isHoverRight ? rightMaxSlide : leftMaxSlide;
    }

    return _marginLeft;
  };

  const handleMouseDown = (e: any) => {
    if (!isOpen) return;

    isSliding.current = true;
    startX.current = e.pageX + (marginLeft / SLIDING_SPEED) * -1;
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
    const _marginLeft = calculateSlidingDistance(e);

    setMarginLeft(_marginLeft);
  };

  const imagesClassName = classNames(
    "images-slider",
    `container-width-${currentImages.length}`,
    {
      "hover-right": !isOpen && isHoverRight && currentImages.length > 1,
      "hover-left": !isOpen && !isHoverRight && currentImages.length > 1,
      "open-right": isOpen && isHoverRight && currentImages.length > 1,
      "open-left": isOpen && !isHoverRight && currentImages.length > 1,
      active: isSliding.current && currentImages.length > 1,
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
            isOpen={isOpen || currentImages.length === 1}
            isSliding={isSliding.current}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
