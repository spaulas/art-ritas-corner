import React, { useRef, useState, useEffect, useContext } from "react";
import type { ImageType } from "data";
import classNames from "classnames";
import Card from "./Card";
import "./styles.scss";
import { BasicFormFields } from "context/FormProvider";
import { BackdropContext } from "context/BackdropProvider";

type ImageProps = {
  categoryID: string;
  images: ImageType[];
  isHoverRight: boolean;
  formName: BasicFormFields["type"];
};

const Images = ({ images, isHoverRight, formName, categoryID }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [marginLeft, setMarginLeft] = useState(0);

  const { setIsBackdropVisible } = useContext(BackdropContext);

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
      setIsBackdropVisible(false)
      setMarginLeft(0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (!isOpen || e.target.id.includes("image-description")) return;

    setIsSliding(true);
    startX.current = e.pageX + (marginLeft / SLIDING_SPEED) * -1;
  };

  const handleOnMouseLeave = () => {
    if (!isOpen) return;
    setIsSliding(false);
  };

  const handleMouseUp = () => {
    if (!isOpen) return;
    setIsSliding(false);
  };

  const handleOnMouseMove = (e: any) => {
    if (!isOpen || !isSliding) return;

    e.preventDefault();
    const _marginLeft = calculateSlidingDistance(e);

    setMarginLeft(_marginLeft);
  };

  const handleOnClick = () => {
    setIsBackdropVisible(true)
    setIsOpen(true);
  };

  const imagesClassName = classNames(
    "images-slider",
    `container-width-${currentImages.length}`,
    {
      "hover-right": !isOpen && isHoverRight && currentImages.length > 1,
      "hover-left": !isOpen && !isHoverRight && currentImages.length > 1,
      "open-right": isOpen && isHoverRight && currentImages.length > 1,
      "open-left": isOpen && !isHoverRight && currentImages.length > 1,
      active: isSliding && currentImages.length > 1,
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
        onClick={handleOnClick}
        style={{ marginLeft }}
      >
        {currentImages.map((image, index) => (
          <Card
            key={image.id}
            categoryID={categoryID}
            image={image}
            zIndex={IMAGES_VISIBLE_ON_HOVER - index}
            isOpen={isOpen || currentImages.length === 1}
            isSliding={isSliding}
            formName={formName}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
