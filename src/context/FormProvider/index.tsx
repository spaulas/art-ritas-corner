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
  key: keyof BasicFormFields,
  value: string | "nails" | "paintings"
) => void;

export type UpdateNailsFieldsFunction = (
  key: keyof NailsFormFields,
  value: string
) => void;

export type UpdatePaintingsFieldsFunction = (
  key: keyof PaintingsFormFields,
  value: string
) => void;

export const FormContext = createContext({
  updateBasicFields: (
    _key: keyof BasicFormFields,
    _value: string | "nails" | "paintings"
  ) => {},
  updateNailsFields: (_key: keyof NailsFormFields, _value: string) => {},
  updatePaintingsFields: (
    _key: keyof PaintingsFormFields,
    _value: string
  ) => {},
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

  const updateBasicFields = (
    key: keyof BasicFormFields,
    value: string | "nails" | "paintings"
  ) => {
    setBasicFields({ ...basicFields, [key]: value });
  };

  const updateNailsFields = (key: keyof NailsFormFields, value: string) => {
    setNailsFields({ ...nailsFields, [key]: value });
  };

  const updatePaintingsFields = (
    key: keyof PaintingsFormFields,
    value: string
  ) => {
    setPaintingsFields({ ...paintingsFields, [key]: value });
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
