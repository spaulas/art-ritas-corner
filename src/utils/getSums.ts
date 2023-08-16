import { NailsFormFields } from "context/FormProvider";
import data from "data.json";
import type { CategoryType, DataType } from "data";

const nailsCategory: CategoryType | undefined = (data as unknown as DataType)
  .categories.nails[1];

export const getServicesTotalDuration = (
  services: NailsFormFields["services"]
): number => {
  let totalDuration = 0;

  services.forEach((service) => {
    const serviceData = nailsCategory?.images?.find(
      (image) => image.id === service
    );
    totalDuration += serviceData?.duration ?? 0;
  });

  return totalDuration;
};

export const getServicesTotalPrice = (
  services: NailsFormFields["services"]
): number => {
  let totalPrice = 0;

  services.forEach((service) => {
    const serviceData = nailsCategory?.images?.find(
      (image) => image.id === service
    );
    totalPrice += serviceData?.price ?? 0;
  });

  return totalPrice;
};
