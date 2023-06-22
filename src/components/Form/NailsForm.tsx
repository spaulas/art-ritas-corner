import React from "react";
import Input from "components/common/Input";
import "./styles.scss";

const NailsForm = () => {
  return (
    <div className="nails-form">
      <div className="fields">
        <Input label="Nom" />
        <Input label="Email" />
        <Input label="Numéro de téléphone" />
        <Input label="Type" />
        <Input label="Service" />
        <Input label="Schedule" />
      </div>

      <div className="fields">
        <Input label="Nom" />
        <Input label="Email" />
        <Input label="Numéro de téléphone" />
        <Input label="Type" />
        <Input label="Service" />
        <Input label="Schedule" />
      </div>
    </div>
  );
};

export default NailsForm;
