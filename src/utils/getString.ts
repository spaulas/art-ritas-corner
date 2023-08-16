import { NailsFormFields, PaintingsFormFields } from "context/FormProvider";
import data from "data.json";
import type { CategoryType, DataType } from "data";

const nailsCategory: CategoryType | undefined = (data as unknown as DataType)
  .categories.nails[1];

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
    const serviceData = nailsCategory?.images?.find(
      (image) => image.id === service
    );
    servicesToString = `${servicesToString}${serviceData?.title?.fr}, `;
  });

  return servicesToString.slice(0, -2);
};

export const getPaintingCategoryToString = (
  category: PaintingsFormFields["category"]
): string => {
  const categoryData: CategoryType | undefined = (
    data as unknown as DataType
  ).categories.paintings.find(({ id }) => id === category);

  return categoryData?.title.fr ?? "";
};

export const getPaintingToString = (
  category: PaintingsFormFields["category"],
  painting: PaintingsFormFields["painting"]
): string => {
  const categoryData: CategoryType | undefined = (
    data as unknown as DataType
  ).categories.paintings.find(({ id }) => id === category);

  const paintingData = categoryData?.images?.find(
    (image) => image.id === painting
  );

  return paintingData?.title?.fr ?? "";
};
