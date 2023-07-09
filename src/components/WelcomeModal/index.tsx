import React, { useContext } from "react";

import data from "data.json";
import type { DataType } from "data.d";
import { LanguageContext } from "context/LanguageProvider";
import "./styles.scss";
import Button from "components/common/Button";
import { BackdropContext } from "context/BackdropProvider";

const WelcomeModal = () => {
  const { language } = useContext(LanguageContext);
  const { isWelcomeVisible, setWelcomeModalVisibility } =
    useContext(BackdropContext);

  const renderParagraph = () => {
    return Object.values((data as DataType).welcome.paragraphs).map(
      (paragraph, index) => (
        <div key={`welcome-paragraph-${index}`}>{paragraph[language]}</div>
      )
    );
  };

  const handleOnClick = () => {
    setWelcomeModalVisibility(false);
  };

  if (!isWelcomeVisible) {
    return null;
  }

  return (
    <div className="welcome-modal-container">
      {renderParagraph()}
      <Button title="Compris!" onClick={handleOnClick} />
    </div>
  );
};

export default WelcomeModal;
