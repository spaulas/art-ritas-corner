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
import NailsDisclaimerCheckbox from "./Nails/DisclaimerCheckbox";
import { DisclaimersContext } from "context/DisclaimersProvider";
import emailjs from "@emailjs/browser";
import NailsSummary from "./Nails/Summary";
import { getServicesTotalDuration, getServicesTotalPrice } from "utils/getSums";
import {
  convertDurationToString,
  getDateToString,
  getPhotosToString,
  getServicesListToString,
} from "utils/getString";
import ConfirmationMessage from "./Messages/Confirmation";
import ErrorMessage from "./Messages/Error";

type FormElements = {
  form: ReactElement;
  extra?: ReactElement;
  buttonTitle?: string;
  onSubmit?: () => void;
};

const ContactForm = () => {
  const [isConfirmationMessageVisible, setIsConfirmationMessageVisible] =
    useState(false);
  const [isErrorMessageVisible, setIsErrorMessageVisible] = useState(false);

  const {
    basicFields,
    nailsFields,
    updateBasicFields,
    updateNailsFields,
    cleanAllFields,
  } = useContext(FormContext);
  const { hasAcceptedNailsTCOnce, setHasAcceptedNailsTCOnce } =
    useContext(DisclaimersContext);
  const [formElements, setFormElements] = useState<FormElements>();

  const onAgreeNailsDisclaimer = () => {
    if (!hasAcceptedNailsTCOnce) {
      setHasAcceptedNailsTCOnce(true);
      updateNailsFields({ disclaimer: true });
    }
    updateBasicFields({ type: "nails" });
  };

  const onSubmitPaintingMessage = () => {};

  const onSubmitNailAppointmentRequest = () => {
    console.log('=========================')
    console.log("nailsFields = ", nailsFields);
    const object = {
      name: basicFields.name,
      email: basicFields.email,
      phoneNumber: basicFields.phone,
      services: getServicesListToString(nailsFields.services),
      duration: convertDurationToString(
        getServicesTotalDuration(nailsFields.services)
      ),
      price: getServicesTotalPrice(nailsFields.services),
      date: getDateToString(nailsFields.date),
      schedule: nailsFields.schedule,
      notes: nailsFields.notes,
      images: getPhotosToString(nailsFields.photos),
    };
    console.log("object = ", object);
    console.log('=========================')

    emailjs
      .send(
        "art-rita-corner--test",
        "ritasartcorner_nails",
        object,
        "QdGvtgrmrTek7hpRv"
      )
      .then(
        () => {
          setIsConfirmationMessageVisible(true);
        },
        () => {
          setIsErrorMessageVisible(true);
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
            extra: (
              <>
                <NailsSummary services={nailsFields.services} />
                <NailsDisclaimerCheckbox />
              </>
            ),
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

  console.log("nailsFields = ", nailsFields);


  const renderView = () => {
    switch (true) {
      case isConfirmationMessageVisible:
        return (
          <ConfirmationMessage
            email={basicFields.email}
            type={basicFields.type}
            goBack={() => {
              cleanAllFields();
              setIsConfirmationMessageVisible(false);
            }}
          />
        );
      case isErrorMessageVisible:
        return (
          <ErrorMessage
            type={basicFields.type}
            goBack={() => {
              cleanAllFields();
              setIsErrorMessageVisible(false);
            }}
          />
        );
      default:
        return (
          <>
            <div className="form-title">Contactez moi</div>
            <Selector />
            {formElements.form}
            {formElements.extra ?? null}
            {formElements.buttonTitle && formElements.onSubmit ? (
              <Button
                title={formElements.buttonTitle}
                onClick={formElements.onSubmit}
              />
            ) : null}
          </>
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
      <div className="form-box">{renderView()}</div>
    </div>
  );
};

export default ContactForm;
