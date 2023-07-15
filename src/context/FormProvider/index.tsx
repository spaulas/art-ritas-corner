import React, { PropsWithChildren, createContext, useState } from "react";

export type BasicFormFields = {
  name: string;
  email: string;
  phone: string;
  type: "paintings" | "nails" | "nailsPrices" | "nailsTC";
};

export type NailsFormFields = {
  date: Date;
  service: string;
  schedule: string;
  address: string;
  notes: string,
  photos: string
  disclaimer: boolean
};

export type PaintingsFormFields = {
  category: string;
  painting: string;
  notes: string;
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
    type: "paintings" as BasicFormFields["type"],
  },
  nailsFields: {
    date: new Date(0),
    service: "",
    schedule: "",
    address: "",
    notes: "",
    photos: "",
    disclaimer: false
  },
  paintingsFields: {
    category: "",
    painting: "",
    notes: "",
  },
});

function FormProvider({ children }: PropsWithChildren<unknown>) {
  const [basicFields, setBasicFields] = useState<BasicFormFields>({
    name: "",
    email: "",
    phone: "",
    type: "paintings" as BasicFormFields["type"],
  });

  const [nailsFields, setNailsFields] = useState<NailsFormFields>({
    date: new Date(0),
    service: "",
    schedule: "",
    address: "",
    notes: "",
    photos: "",
    disclaimer: false
  });

  const [paintingsFields, setPaintingsFields] = useState<PaintingsFormFields>({
    category: "",
    painting: "",
    notes: "",
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
