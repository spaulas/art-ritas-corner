import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";

export const DisclaimersContext = createContext({
  hasAcceptedNailsTCOnce: false,
  setHasAcceptedNailsTCOnce: (_isVisible: boolean): any => null,
  hasViewedWelcomeMessageOnce: undefined as boolean | undefined,
  setHasViewedWelcomeMessageOnce: (): any => null,
});

function DisclaimersProvider({ children }: PropsWithChildren<unknown>) {
  const [hasAcceptedNailsTCOnce, setHasAcceptedNailsTCOnce] =
    useState<boolean>(false);
  const [hasViewedWelcomeMessageOnce, setHasViewedWelcomeMessageOnce] =
    useState<boolean | undefined>(undefined);

  useEffect(function getInitialWelcomeMessageValue() {
    const savedWelcomeMessageOnce = localStorage.getItem(
      "hasViewedWelcomeMessageOnce"
    );
    setHasViewedWelcomeMessageOnce(Boolean(savedWelcomeMessageOnce));
  }, []);

  const handleSetHasViewedWelcomeMessageOnce = () => {
    localStorage.setItem("hasViewedWelcomeMessageOnce", "true");
    setHasViewedWelcomeMessageOnce(true);
  };

  return (
    <DisclaimersContext.Provider
      value={{
        hasAcceptedNailsTCOnce,
        setHasAcceptedNailsTCOnce,
        hasViewedWelcomeMessageOnce,
        setHasViewedWelcomeMessageOnce: handleSetHasViewedWelcomeMessageOnce,
      }}
    >
      {children}
    </DisclaimersContext.Provider>
  );
}

export default DisclaimersProvider;
