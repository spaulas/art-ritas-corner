import React, { PropsWithChildren, createContext, useState } from "react";

type Languages = "fr" | "en";

export const LanguageContext = createContext({
  language: "" as Languages,
  changeLanguage: (newLanguage: "fr"): any => null,
});

function LanguageProvider({ children }: PropsWithChildren<unknown>) {
  const [language, setLanguage] = useState<Languages>("fr");

  const changeLanguage = (newLanguage: Languages) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
