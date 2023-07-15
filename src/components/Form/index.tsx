import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "components/common/Button";
import blobBlue03 from "assets/Blobs/blob_blue_03.png";
import blobCream09 from "assets/Blobs/blob_cream_09.png";
import Selector from "./Selector";
import BasicForm from "./Basic";
import { FormContext } from "context/FormProvider";
import "./styles.scss";
import NailsPrices from "./NailsPrices";
import NailsTC from "./NailsTC";
import NailsDisclaimerCheckbox from "./Nails/DisclaimerCheckbox";
import { DisclaimersContext } from "context/DisclaimersProvider";
import emailjs from "@emailjs/browser";

type FormElements = {
  form: ReactElement;
  checkbox?: ReactElement;
  buttonTitle?: string;
  onSubmit?: () => void;
};

const ContactForm = () => {
  const { basicFields, nailsFields, updateBasicFields, updateNailsFields } =
    useContext(FormContext);
  const { hasAcceptedNailsTCOnce, setHasAcceptedNailsTCOnce } =
    useContext(DisclaimersContext);
  const [formElements, setFormElements] = useState<FormElements>();

  const temp = useRef<HTMLFormElement>(null);

  const onAgreeNailsDisclaimer = () => {
    if (!hasAcceptedNailsTCOnce) {
      setHasAcceptedNailsTCOnce(true);
      updateNailsFields({ disclaimer: true });
    }
    updateBasicFields({ type: "nails" });
  };

  const onSubmitPaintingMessage = () => {};

  const onSubmitNailAppointmentRequest = () => {
    emailjs
      .send(
        "art-rita-corner--test",
        "nailsTemplate",
        {
          name: basicFields.name,
          email: basicFields.email,
          phoneNumber: basicFields.phone,
          services: nailsFields.services.toString(),
          duration: 0,
          price: 0,
          date: "23/07/2023",
          schedule: "10h00-11h00",
          notes: "Notes!",
          images: []
        },
        "QdGvtgrmrTek7hpRv"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(
    function getFormElements() {
      switch (basicFields.type) {
        case "nailsPrices":
          setFormElements({
            form: <NailsPrices />,
          });
          break;
        case "nailsTC":
          setFormElements({
            form: <NailsTC />,
            buttonTitle: "Je suis d'accord",
            onSubmit: onAgreeNailsDisclaimer,
          });
          break;
        case "nails":
          setFormElements({
            form: <BasicForm />,
            buttonTitle: "Reservez-le",
            onSubmit: onSubmitNailAppointmentRequest,
            checkbox: <NailsDisclaimerCheckbox />,
          });
          break;
        case "paintings":
        default:
          setFormElements({
            form: <BasicForm />,
            buttonTitle: "Envoyer le message",
            onSubmit: onSubmitPaintingMessage,
          });
          break;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <form ref={temp}>
          <div className="form-title">Contactez moi</div>
          <Selector />
          {formElements.form}
          {formElements.checkbox ?? null}
        </form>
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
