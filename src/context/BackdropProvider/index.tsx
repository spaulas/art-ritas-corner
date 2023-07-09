import React, { PropsWithChildren, createContext, useState } from "react";

export const BackdropContext = createContext({
  isBackdropVisible: false,
  setIsBackdropVisible: (_isVisible: boolean): any => null,
  isWelcomeVisible: false,
  setWelcomeModalVisibility: (_isVisible: boolean): any => null,
});

function BackdropProvider({ children }: PropsWithChildren<unknown>) {
  const [isBackdropVisible, setIsBackdropVisible] = useState<boolean>(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(false);

  const setWelcomeModalVisibility = (_isVisible: boolean) => {
    setIsBackdropVisible(_isVisible)
    setIsWelcomeVisible(_isVisible)
  }

  return (
    <BackdropContext.Provider
      value={{
        isBackdropVisible,
        setIsBackdropVisible,
        isWelcomeVisible,
        setWelcomeModalVisibility,
      }}
    >
      {children}
    </BackdropContext.Provider>
  );
}

export default BackdropProvider;
