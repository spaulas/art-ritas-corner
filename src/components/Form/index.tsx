import React, { useContext } from "react";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
import Selector from "./Selector";
import BasicForm from "./Basic";
import { FormContext } from "context/FormProvider";
import "./styles.scss";
import NailsPrices from "./NailsPrices";
import NailsTC from "./NailsTC";

const ContactForm = () => {
  const { basicFields } = useContext(FormContext);

  const renderView = () => {
    switch (basicFields.type) {
      case "nailsPrices":
        return <NailsPrices />;
      case "nailsTC":
        return <NailsTC />;
      case "paintings":
      case "nails":
      default:
        return <BasicForm />;
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
        <Selector />
        {renderView()}
        <Button
          title="Reservez-le"
          onClick={() => console.log("send form info")}
        />
      </div>
    </div>
  );
};

export default ContactForm;
