import { NailsFormFields } from "context/FormProvider";
import React, { useEffect, useState } from "react";
import { convertDurationToString } from "utils/getString";
import { getServicesTotalDuration, getServicesTotalPrice } from "utils/getSums";
import "./styles.scss";

type SummaryProps = {
  services: NailsFormFields["services"];
};

const NailsSummary = ({ services }: SummaryProps) => {
  const [totalDuration, setTotalDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(
    function getSummary() {
      if (!services.length) {
        return;
      }

      const _totalDuration = getServicesTotalDuration(services);
      const _totalPrice = getServicesTotalPrice(services);

      setTotalDuration(_totalDuration);
      setTotalPrice(_totalPrice);
    },
    [services]
  );

  if (!services.length) {
    return null;
  }

  return (
    <div className="nails-summary">
      <div className="nails-summary__line">
        <span className="nails-summary__title">Durée totale: </span>
        {convertDurationToString(totalDuration)}
      </div>
      <div className="nails-summary__line">
        <span className="nails-summary__title">Prix total: </span>
        {totalPrice}€
      </div>
    </div>
  );
};

export default NailsSummary;
