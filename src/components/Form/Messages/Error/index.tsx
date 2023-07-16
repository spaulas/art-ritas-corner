import { BasicFormFields } from "context/FormProvider";
import React from "react";

type ErrorMessageProps = {
  type: BasicFormFields["type"];
  goBack: () => void
};

const ErrorMessage = (props: ErrorMessageProps) => {
  return <div></div>;
};

export default ErrorMessage;
