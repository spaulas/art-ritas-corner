import Button from "components/common/Button";
import React from "react";
import "./styles.scss";
import { BasicFormFields } from "context/FormProvider";

type ConfirmationMessageProps = {
  email: string;
  type: BasicFormFields["type"];
  goBack: () => void;
};

const ConfirmationMessage = ({
  email,
  type,
  goBack,
}: ConfirmationMessageProps) => {
  const title =
    type === "nails"
      ? "Votre demande de rendez-vous a été envoyée avec succès."
      : "Your message request was successfully sent.";

  return (
    <div className="confirmation-message">
      <div className="confirmation-message__title">{title}</div>
      <div className="confirmation-message__email">{`Une copie de votre demande a été envoyée à ${email}.`}</div>
      <div className="confirmation-message__thanks">
        Merci, <span>RitasArtCorner</span>.
      </div>
      <Button title="Retourner" onClick={goBack} />
    </div>
  );
};

export default ConfirmationMessage;
