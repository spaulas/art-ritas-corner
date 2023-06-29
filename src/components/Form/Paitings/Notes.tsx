import {
  PaintingsFormFields,
  UpdatePaintingsFieldsFunction,
} from "context/FormProvider";
import React from "react";

type PaitingsNotesProps = {
  fieldNote: PaintingsFormFields["notes"];
  updatePaintingsFields: UpdatePaintingsFieldsFunction;
};

const PaitingsNotes = (props: PaitingsNotesProps) => {
  return <div></div>;
};

export default PaitingsNotes;
