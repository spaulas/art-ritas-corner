import React from "react";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
import Selector from "./Selector"
import "./styles.scss";
import BasicForm from "./Basic";

const ContactForm = () => {
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
        <BasicForm />
        <Button
          title="Reservez-le"
          onClick={() => console.log("send form info")}
        />
      </div>
    </div>
  );
};

export default ContactForm;
