import Textbox from "components/common/Textbox";
import {
  PaintingsFormFields,
  UpdatePaintingsFieldsFunction,
} from "context/FormProvider";
import React from "react";

type PaitingsNotesProps = {
  fieldNote: PaintingsFormFields["notes"];
  updatePaintingsFields: UpdatePaintingsFieldsFunction;
};

const PaitingsNotes = ({
  fieldNote,
  updatePaintingsFields,
}: PaitingsNotesProps) => {
  return (
    <Textbox
      label="Remarques"
      value={fieldNote}
      onUpdate={(value: string) => updatePaintingsFields({ notes: value })}
    />
  );
};

export default PaitingsNotes;
