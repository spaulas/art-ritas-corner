import React, { useContext } from "react";
import Link from "components/common/Link";
import { FormContext } from "context/FormProvider";
import "./styles.scss";

const TopBar = () => {
  const { updateBasicFields } = useContext(FormContext);

  const handleAboutMeClick = () => {
    document.getElementById("about-page")?.scrollIntoView();
  };

  const handleContactMeClick = () => {
    updateBasicFields({ type: "paintings" });
    document.getElementById("form-page")?.scrollIntoView();
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/art_ritascorner/");
  };

  return (
    <div className="top-bar">
      <Link onClick={handleAboutMeClick}>Sur moi</Link>
      <Link onClick={handleContactMeClick}>Contactez moi</Link>
      <Link onClick={handleInstagramClick}>Instagram</Link>
      {/* TODO: <Link onClick={handleLanguageClick}>FR</Link> */}
    </div>
  );
};

export default TopBar;
