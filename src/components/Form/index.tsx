import React, { useState } from "react";
import NailsForm from "./NailsForm";
import PaintingForm from "./PaintingForm";
import "./styles.scss";
import Button from "components/common/Button";

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
        <Button
          title="Reservez-le"
          onClick={() => console.log("send form info")}
        />
      </div>
    </div>
  );
};

export default ContactForm;
