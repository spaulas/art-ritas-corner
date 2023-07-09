import React, { useContext } from "react";
import Input from "components/common/Input";
import NailsCalendar from "../Nails/Calendar";
import PaitingsNotes from "../Paitings/Notes";
import PaintingsFields from "../Paitings/Fields";
import NailsFields from "../Nails/Fields";
import { FormContext } from "context/FormProvider";
import "../styles.scss";

const BasicForm = () => {
  const {
    basicFields,
    nailsFields,
    paintingsFields,
    updateBasicFields,
    updateNailsFields,
    updatePaintingsFields,
  } = useContext(FormContext);

  const renderLeftFields = () => {
    switch (basicFields.type) {
      case "paintings":
        return (
          <PaintingsFields
            fields={paintingsFields}
            updatePaintingsFields={updatePaintingsFields}
          />
        );
      case "nails":
      default:
        return (
          <NailsFields
            fields={{ ...basicFields, ...nailsFields }}
            updateBasicFields={updateBasicFields}
            updateNailsFields={updateNailsFields}
          />
        );
    }
  };

  const renderRightFields = () => {
    switch (basicFields.type) {
      case "paintings":
        return (
          <PaitingsNotes
            fieldNote={paintingsFields.notes}
            updatePaintingsFields={updatePaintingsFields}
          />
        );
      case "nails":
      default:
        return (
          <NailsCalendar
            fieldDate={nailsFields.date}
            updateNailsFields={updateNailsFields}
          />
        );
    }
  };

  return (
    <div className="nails-form">
      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={basicFields.name}
          onUpdate={(value: string) => updateBasicFields({ name: value })}
        />
        <Input
          type="email"
          label="Email"
          value={basicFields.email}
          onUpdate={(value: string) => updateBasicFields({ email: value })}
        />
        <Input
          type="phone"
          label="Numéro de téléphone"
          value={basicFields.phone}
          onUpdate={(value: string) => updateBasicFields({ phone: value })}
        />
        {renderLeftFields()}
      </div>

      <div className="fields">{renderRightFields()}</div>
    </div>
  );
};

export default BasicForm;
