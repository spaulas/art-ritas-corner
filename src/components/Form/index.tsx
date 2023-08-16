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
  getPaintingCategoryToString,
  getDateToString,
  getPaintingToString,
  getServicesListToString,
} from "utils/getString";
import ConfirmationMessage from "./Messages/Confirmation";
import ErrorMessage from "./Messages/Error";
import Spinner from "components/common/Spinner";

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
  const [isSending, setIsSending] = useState(false);
  const [formElements, setFormElements] = useState<FormElements>();

  const {
    basicFields,
    nailsFields,
    paintingsFields,
    updateBasicFields,
    updateNailsFields,
    cleanAllFields,
  } = useContext(FormContext);
  const { hasAcceptedNailsTCOnce, setHasAcceptedNailsTCOnce } =
    useContext(DisclaimersContext);

  const onAgreeNailsDisclaimer = () => {
    if (!hasAcceptedNailsTCOnce) {
      setHasAcceptedNailsTCOnce(true);
    }
    updateNailsFields({ disclaimer: true });
    updateBasicFields({ type: "nails" });
  };

  const onSubmitPaintingMessage = () => {
    setIsSending(true);

    emailjs
      .send(
        "art-rita-corner--test",
        "ritasartcorner_paintings",
        {
          admin: "psantosdeveloper@gmail.com",
          name: basicFields.name,
          email: basicFields.email,
          phoneNumber: basicFields.phone,
          category: getPaintingCategoryToString(paintingsFields.category),
          painting: getPaintingToString(
            paintingsFields.category,
            paintingsFields.painting
          ),
          notes: paintingsFields.notes,
        },
        "QdGvtgrmrTek7hpRv"
      )
      .then(
        () => {
          setIsSending(false);
          setIsConfirmationMessageVisible(true);
        },
        () => {
          setIsSending(false);
          setIsErrorMessageVisible(true);
        }
      );
  };

  const onSubmitNailAppointmentRequest = () => {
    setIsSending(true);

    emailjs
      .send(
        "art-rita-corner--test",
        "ritasartcorner_nails",
        {
          admin: "psantosdeveloper@gmail.com",
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
          image1: nailsFields.photos[0],
          image2: nailsFields.photos[1],
          image3: nailsFields.photos[2],
          image4: nailsFields.photos[3],
          image5: nailsFields.photos[4],
        },
        "QdGvtgrmrTek7hpRv"
      )
      .then(
        () => {
          setIsSending(false);
          setIsConfirmationMessageVisible(true);
        },
        () => {
          setIsSending(false);
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

  const renderView = () => {
    switch (true) {
      case isSending:
        return <Spinner title="Envoi en cours..." />;
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
