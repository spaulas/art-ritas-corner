import React, { useContext } from "react";

import data from "data.json";
import type { DataType } from "data.d";
import { LanguageContext } from "context/LanguageProvider";
import "./styles.scss";
import Button from "components/common/Button";
import { BackdropContext } from "context/BackdropProvider";
import { DisclaimersContext } from "context/DisclaimersProvider";

const WelcomeModal = () => {
  const { language } = useContext(LanguageContext);
  const { isWelcomeVisible, setWelcomeModalVisibility } =
    useContext(BackdropContext);
  const { hasViewedWelcomeMessageOnce, setHasViewedWelcomeMessageOnce } =
    useContext(DisclaimersContext);

  const renderParagraph = () => {
    return Object.values((data as DataType).welcome.paragraphs).map(
      (paragraph, index) => (
        <div className="welcome-paragraph" key={`welcome-paragraph-${index}`}>
          {paragraph[language]}
        </div>
      )
    );
  };

  const handleOnClick = () => {
    setWelcomeModalVisibility(false);
    
    if (!hasViewedWelcomeMessageOnce) {
      setHasViewedWelcomeMessageOnce();
    }
  };

  if (!isWelcomeVisible) {
    return null;
  }

  return (
    <div className="welcome-modal-container">
      <div className="welcome-modal-border">
        {renderParagraph()}
        <Button title="Compris!" isDark onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default WelcomeModal;
