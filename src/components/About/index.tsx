import React from "react";
import Picture from "./Picture";
import "./styles.scss";

type AboutProps = {
  profileText: string;
};

const About = ({ profileText }: AboutProps) => {
  return (
    <div className="about-page">
      <Picture text={profileText} />
    </div>
  );
};

export default About;
