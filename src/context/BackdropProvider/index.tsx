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
  checkHasClickedOutside: (e: any) => false as boolean,
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

  const checkHasClickedOutside = (e: any): boolean => {
    const backdrop = document.querySelector("#backdrop");
    const sliders = document.querySelectorAll("#category-image-slider");

    if (!sliders) return false;
    if (!backdrop?.classList.contains("backdrop--visible")) return false;

    const hasAnySliderBeenClicked = Object.values(sliders).find((slider) =>
      slider.contains(e.target as Node)
    );
    if (hasAnySliderBeenClicked) return false;

    return true;
  };

  useEffect(() => {
    const onScroll = () => {
      setIsBackdropVisible(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onClickOutside = (e: any) => {
      const hasClickedOutside = checkHasClickedOutside(e);

      if (!hasClickedOutside) return;
      setIsBackdropVisible(false);
    };
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BackdropContext.Provider
      value={{
        isBackdropVisible,
        setIsBackdropVisible,
        isWelcomeVisible,
        setWelcomeModalVisibility,
        checkHasClickedOutside,
      }}
    >
      {children}
    </BackdropContext.Provider>
  );
}

export default BackdropProvider;
