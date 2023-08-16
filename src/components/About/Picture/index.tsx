import React from "react";
import profile from "assets/profile.jpeg";

import "./styles.scss";

type PictureProps = {
  text?: string;
};

const Picture = ({ text }: PictureProps) => {
  return (
    <div className="profile-pic">
      <img src={profile} alt="profile-pic" />
      {Boolean(text) ? (
        <>
          <div className="overlay" />
          <div className="profile-text">{text}</div>
        </>
      ) : null}
    </div>
  );
};

export default Picture;
