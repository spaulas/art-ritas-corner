import React, { useState } from "react";
import NailsForm from "./NailsForm";
import PaintingForm from "./PaintingForm";
import "./styles.scss";

const ContactForm = () => {
  const [currentForm, setCurrentForm] = useState("nails");

  const renderForm = () => {
    switch (currentForm) {
      case "paitings":
        return <PaintingForm />;
      case "nails":
      default:
        return <NailsForm />;
    }
  };

  return (
    <div className="form-page">
      <div className="form-box">
        <div className="form-title">Contactez moi</div>
        {renderForm()}
      </div>
    </div>
  );
};

export default ContactForm;
