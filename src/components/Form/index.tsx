import React, { useContext } from "react";
import NailsForm from "./NailsForm";
import PaintingForm from "./PaintingForm";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
import "./styles.scss";
import { FormContext } from "context/FormProvider";

const ContactForm = () => {
  const {
    basicFields,
    nailsFields,
    paintingsFields,
    updateBasicFields,
    updateNailsFields,
    updatePaintingsFields,
  } = useContext(FormContext);

  const renderForm = () => {
    switch (basicFields.type) {
      case "paintings":
        return (
          <PaintingForm
            fields={{ ...basicFields, ...paintingsFields }}
            updateBasicFields={updateBasicFields}
            updatePaintingsFields={updatePaintingsFields}
          />
        );
      case "nails":
      default:
        return (
          <NailsForm
            fields={{ ...basicFields, ...nailsFields }}
            updateBasicFields={updateBasicFields}
            updateNailsFields={updateNailsFields}
          />
        );
    }
  };

  return (
    <div className="form-page" id="form-page">
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
