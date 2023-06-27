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
  const { fields, updateBasicFields, updateNailsFields } = props;

  return (
    <div className="nails-form">
      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={fields.name}
          onUpdate={(value: string) => updateBasicFields("name", value)}
        />
        <Input
          type="email"
          label="Email"
          value={fields.email}
          onUpdate={(value: string) => updateBasicFields("email", value)}
        />
        <Input
          type="phone"
          label="Numéro de téléphone"
          value={fields.phone}
          onUpdate={(value: string) => updateBasicFields("phone", value)}
        />
        <Input
          type="text"
          label="Type"
          value={fields.type}
          onUpdate={(value: string) => updateBasicFields("type", value)}
        />
        <Input
          type="text"
          label="Service"
          value={fields.service}
          onUpdate={(value: string) => updateNailsFields("service", value)}
        />
        <Input
          type="text"
          label="Schedule"
          value={fields.schedule}
          onUpdate={(value: string) => updateNailsFields("schedule", value)}
        />
      </div>

      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={fields.name}
          onUpdate={(value: string) => updateBasicFields("name", value)}
        />
        {/* <Input label="Email" />
        <Input label="Numéro de téléphone" />
        <Input label="Type" />
        <Input label="Service" />
        <Input label="Schedule" /> */}
      </div>
    </div>
  );
};

export default NailsForm;
