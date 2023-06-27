import React from "react";
import {
  BasicFormFields,
  PaintingsFormFields,
  UpdateBasicFieldsFunction,
  UpdatePaintingsFieldsFunction,
} from "context/FormProvider";

type PaintingsFormProps = {
  fields: BasicFormFields & PaintingsFormFields;
  updateBasicFields: UpdateBasicFieldsFunction;
  updatePaintingsFields: UpdatePaintingsFieldsFunction;
};

const PaintingForm = (props: PaintingsFormProps) => {
  return <div>PaintingForm</div>;
};

export default PaintingForm;
