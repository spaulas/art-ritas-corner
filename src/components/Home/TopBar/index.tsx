import React, { useContext } from "react";
import Link from "components/common/Link";
import { FormContext } from "context/FormProvider";
import "./styles.scss";
import { BackdropContext } from "context/BackdropProvider";

const TopBar = () => {
  const { basicFields } = useContext(FormContext);
  const { setWelcomeModalVisibility } = useContext(BackdropContext);

  const handleWelcomeClick = () => {
    setWelcomeModalVisibility(true);
  };

  const handleAboutMeClick = () => {
    document.getElementById("about-page")?.scrollIntoView();
  };

  const handleContactMeClick = () => {
    document.getElementById("form-page")?.scrollIntoView();
  };

  // TODO: DIFERENCIAR ESSA BOSTA
  const handleInstagramClick = () => {
    if (basicFields.type === "paintings") {
      window.open("https://www.instagram.com/art_ritascorner/");
      return;
    }

    window.open("https://www.instagram.com/ritanails_corner/");
  };

  const handleTikTokClick = () => {
    window.open("https://www.tiktok.com/@ritasartcorner");
  };

  return (
    <div className="top-bar">
      <Link onClick={handleWelcomeClick}>Bienvenue</Link>
      <Link onClick={handleAboutMeClick}>Sur moi</Link>
      <Link onClick={handleContactMeClick}>Contactez moi</Link>
      <Link onClick={handleInstagramClick}>Instagram</Link>
      <Link onClick={handleTikTokClick}>TikTok</Link>
      {/* TODO: <Link onClick={handleLanguageClick}>FR</Link> */}
    </div>
  );
};

export default TopBar;
