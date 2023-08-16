import React, { PropsWithChildren, createContext, useState } from "react";

export type BasicFormFields = {
  name: string;
  email: string;
  phone: string;
  type: "paintings" | "nails" | "nailsPrices" | "nailsTC";
};

export type NailsFormFields = {
  date: Date;
  services: string[];
  schedule: string;
  address: string;
  notes: string;
  photos: string[];
  disclaimer: boolean;
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
  cleanAllFields: () => {},
  basicFields: {
    name: "",
    email: "",
    phone: "",
    type: "paintings" as BasicFormFields["type"],
  },
  nailsFields: {
    date: new Date(0),
    services: [] as string[],
    schedule: "",
    address: "",
    notes: "",
    photos: [] as string[],
    disclaimer: false,
  },
  paintingsFields: {
    category: "",
    painting: "",
    notes: "",
  },
});

function FormProvider({ children }: PropsWithChildren<unknown>) {
  const initialBasicFields = {
    name: "",
    email: "",
    phone: "",
    type: "paintings" as BasicFormFields["type"],
  };
  const initialNailsFields = {
    date: new Date(0),
    services: [],
    schedule: "",
    address: "",
    notes: "",
    photos: [] as string[],
    disclaimer: false,
  };
  const initialPaintingFields = {
    category: "",
    painting: "",
    notes: "",
  };

  const [basicFields, setBasicFields] =
    useState<BasicFormFields>(initialBasicFields);
  const [nailsFields, setNailsFields] =
    useState<NailsFormFields>(initialNailsFields);
  const [paintingsFields, setPaintingsFields] = useState<PaintingsFormFields>(
    initialPaintingFields
  );

  const updateBasicFields = (newValues: Partial<BasicFormFields>) => {
    setBasicFields({ ...basicFields, ...newValues });
  };

  const updateNailsFields = (newValues: Partial<NailsFormFields>) => {
    setNailsFields({ ...nailsFields, ...newValues });
  };

  const updatePaintingsFields = (newValues: Partial<PaintingsFormFields>) => {
    setPaintingsFields({ ...paintingsFields, ...newValues });
  };

  const cleanAllFields = () => {
    setBasicFields({ ...initialBasicFields, type: basicFields.type });
    setNailsFields(initialNailsFields);
    setPaintingsFields(initialPaintingFields);
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
        cleanAllFields,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export default FormProvider;
