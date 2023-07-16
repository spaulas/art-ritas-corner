import { NailsFormFields } from "context/FormProvider";
import data from "data.json";
import type { CategoryType, DataType } from "data";

const nailsCategory: CategoryType | undefined = (
  data as DataType
).categories.find(({ id }) => id === "nailArt");

export const convertDurationToString = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h${minutes === 0 ? "00" : minutes}`;
};

// TODO: get current language
export const getDateToString = (date: Date): string => {
  return date.toLocaleString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// TODO: get current language
export const getServicesListToString = (
  services: NailsFormFields["services"]
): string => {
  let servicesToString = "";
  services.forEach((service) => {
    const serviceData = nailsCategory?.images.find(
      (image) => image.id === service
    );
    servicesToString = `${servicesToString}${serviceData?.title.fr}, `;
  });

  return servicesToString.slice(0, -2);
};

