import React, { useState } from "react";
import NailsForm from "./NailsForm";
import PaintingForm from "./PaintingForm";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
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
      <div className="form-blobs">
        <img
          className="form-blob-cream"
          src={blobCream09}
          alt="form-blob-cream"
        />
        <img className="form-blob-blue" src={blobBlue03} alt="form-blob-blue" />
      </div>
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
