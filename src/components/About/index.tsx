import React from "react";
import Picture from "./Picture";
import "./styles.scss";
import bottomRectangle from "assets/bottomRectangle.png";
import flower02 from "assets/Flowers/flower02.png";
import flower06 from "assets/Flowers/flower06.png";

type AboutProps = {
  profileText: string;
};

const About = ({ profileText }: AboutProps) => {
  return (
    <div className="about-page">
      <Picture text={profileText} />
      <div className="about-flowers-container">
        <img className="about-flower" src={flower02} alt="flower02" />
        <img className="about-flower" src={flower06} alt="flower06" />
      </div>
      <div className="about-bottom">
        <img className="bottom-rectangle" src={bottomRectangle} alt="bottomRectangle" /></div>
    </div>
  );
};

export default About;
