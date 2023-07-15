import React, {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { DisclaimersContext } from "context/DisclaimersProvider";

export const BackdropContext = createContext({
  isBackdropVisible: false,
  setIsBackdropVisible: (_isVisible: boolean): any => null,
  isWelcomeVisible: false,
  setWelcomeModalVisibility: (_isVisible: boolean): any => null,
});

function BackdropProvider({ children }: PropsWithChildren<unknown>) {
  const { hasViewedWelcomeMessageOnce } = useContext(DisclaimersContext);

  const [isBackdropVisible, setIsBackdropVisible] = useState<boolean>(false);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState<boolean>(false);

  const setWelcomeModalVisibility = (_isVisible: boolean) => {
    setIsBackdropVisible(_isVisible);
    setIsWelcomeVisible(_isVisible);
  };

  useEffect(() => {
    if (hasViewedWelcomeMessageOnce === false) {
      setWelcomeModalVisibility(true);
    }
  }, [hasViewedWelcomeMessageOnce]);

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
