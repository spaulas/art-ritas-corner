import React, { PropsWithChildren, createContext, useState } from "react";

export type BasicFormFields = {
  name: string;
  email: string;
  phone: string;
  type: "nails" | "paintings";
};

export type NailsFormFields = {
  date: string;
  service: string;
  schedule: string;
  address: string;
};

export type PaintingsFormFields = {
  category: string;
  painting: string;
};

export type UpdateBasicFieldsFunction = (
  newValues: Partial<BasicFormFields>
) => void;

export type UpdateNailsFieldsFunction = (
  newValues: Partial<NailsFormFields>
) => void;

export type UpdatePaintingsFieldsFunction = (
  newValues: Partial<PaintingsFormFields>
) => void;

export const FormContext = createContext({
  updateBasicFields: (_newValues: Partial<BasicFormFields>) => {},
  updateNailsFields: (_newValues: Partial<NailsFormFields>) => {},
  updatePaintingsFields: (_newValues: Partial<PaintingsFormFields>) => {},
  basicFields: {
    name: "",
    email: "",
    phone: "",
    type: "nails" as BasicFormFields["type"],
  },
  nailsFields: {
    date: "",
    service: "",
    schedule: "",
    address: "",
  },
  paintingsFields: {
    category: "",
    painting: "",
  },
});

function FormProvider({ children }: PropsWithChildren<unknown>) {
  const [basicFields, setBasicFields] = useState<BasicFormFields>({
    name: "",
    email: "",
    phone: "",
    type: "nails" as BasicFormFields["type"],
  });

  const [nailsFields, setNailsFields] = useState<NailsFormFields>({
    date: "",
    service: "",
    schedule: "",
    address: "",
  });

  const [paintingsFields, setPaintingsFields] = useState<PaintingsFormFields>({
    category: "",
    painting: "",
  });

  const updateBasicFields = (newValues: Partial<BasicFormFields>) => {
    setBasicFields({ ...basicFields, ...newValues });
  };

  const updateNailsFields = (newValues: Partial<NailsFormFields>) => {
    setNailsFields({ ...nailsFields, ...newValues });
  };

  const updatePaintingsFields = (newValues: Partial<PaintingsFormFields>) => {
    setPaintingsFields({ ...paintingsFields, ...newValues });
  };

  return (
    <FormContext.Provider
      value={{
        basicFields,
        nailsFields,
        paintingsFields,
        updateBasicFields,
        updateNailsFields,
        updatePaintingsFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
