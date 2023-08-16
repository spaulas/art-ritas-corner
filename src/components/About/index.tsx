import React, { useContext } from "react";
import Picture from "./Picture";
import "./styles.scss";
import bottomRectangle from "assets/bottomRectangle.png";
import blobBlue08 from "assets/Blobs/blob_blue_08.png";
import blobCream13 from "assets/Blobs/blob_cream_13.png";
import flower02 from "assets/Flowers/flower02.png";
import flower06 from "assets/Flowers/flower06.png";
import { LanguageContext } from "context/LanguageProvider";
import type { Text } from "data.d";

type AboutProps = {
  profileText?: Text;
};

const About = ({ profileText }: AboutProps) => {
  const { language } = useContext(LanguageContext);

  return (
    <div className="about-page" id="about-page">
      <div className="about-blobs">
        <img
          className="about-blob-blue"
          src={blobBlue08}
          alt="about-blob-blue"
        />
        <img
          className="about-blob-cream"
          src={blobCream13}
          alt="about-blob-cream"
        />
      </div>
      <Picture text={profileText?.[language]} />
      <div className="about-flowers-container">
        <img className="about-flower" src={flower02} alt="flower02" />
        <img className="about-flower" src={flower06} alt="flower06" />
      </div>
      <div className="about-bottom">
        <img
          className="bottom-rectangle"
          src={bottomRectangle}
          alt="bottomRectangle"
        />
      </div>
    </div>
  );
};

export default About;
