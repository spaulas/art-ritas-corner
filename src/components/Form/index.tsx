import React, { ReactElement, useContext, useEffect, useState } from "react";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
import Selector from "./Selector";
import BasicForm from "./Basic";
import { FormContext } from "context/FormProvider";
import "./styles.scss";
import NailsPrices from "./NailsPrices";
import NailsTC from "./NailsTC";

type FormElements = {
  formComponent: ReactElement;
  buttonTitle?: string;
  onSubmit?: () => void;
};

const ContactForm = () => {
  const { basicFields } = useContext(FormContext);
  const [formElements, setFormElements] = useState<FormElements>();

  const onAgreeNailsDisclaimer = () => {};

  const onSubmitPaintingMessage = () => {};

  const onSubmitNailAppointmentRequest = () => {};

  useEffect(
    function getFormElements() {
      switch (basicFields.type) {
        case "nailsPrices":
          setFormElements({
            formComponent: <NailsPrices />,
          });
          break;
        case "nailsTC":
          setFormElements({
            formComponent: <NailsTC />,
            buttonTitle: "Je suis d'accord",
            onSubmit: onAgreeNailsDisclaimer,
          });
          break;
        case "nails":
          setFormElements({
            formComponent: <BasicForm />,
            buttonTitle: "Reservez-le",
            onSubmit: onSubmitNailAppointmentRequest,
          });
          break;
        case "paintings":
        default:
          setFormElements({
            formComponent: <BasicForm />,
            buttonTitle: "Envoyer le message",
            onSubmit: onSubmitPaintingMessage,
          });
          break;
      }
    },
    [basicFields.type]
  );

  if (!formElements) {
    return null;
  }

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
        {formElements.formComponent}
        {formElements.buttonTitle && formElements.onSubmit ? (
          <Button
            title={formElements.buttonTitle}
            onClick={formElements.onSubmit}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ContactForm;
