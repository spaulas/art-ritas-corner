import React from "react";
import Input from "components/common/Input";
import "./styles.scss";
import {
  BasicFormFields,
  NailsFormFields,
  UpdateBasicFieldsFunction,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";

type NailsFormProps = {
  fields: BasicFormFields & NailsFormFields;
  updateBasicFields: UpdateBasicFieldsFunction;
  updateNailsFields: UpdateNailsFieldsFunction;
};

const NailsForm = (props: NailsFormProps) => {
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
