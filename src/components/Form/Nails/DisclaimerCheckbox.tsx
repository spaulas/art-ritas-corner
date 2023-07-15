import React, { useContext } from "react";
import Checkbox from "components/common/Checkbox";
import { DisclaimersContext } from "context/DisclaimersProvider";
import { FormContext } from "context/FormProvider";

const NailsDisclaimerCheckbox = () => {
  const { hasAcceptedNailsTCOnce } = useContext(DisclaimersContext);
  const { nailsFields, updateNailsFields, updateBasicFields } =
    useContext(FormContext);

  const handleOnChange = (value: boolean) => {
    if (hasAcceptedNailsTCOnce) {
      updateNailsFields({ disclaimer: value });
    } else {
      updateBasicFields({ type: "nailsTC" });
    }
  };

  return (
    <Checkbox
      id="nails-disclaimer"
      label="J'accepte les termes et conditions"
      value={nailsFields.disclaimer}
      onChange={handleOnChange}
    />
  );
};

export default NailsDisclaimerCheckbox;
