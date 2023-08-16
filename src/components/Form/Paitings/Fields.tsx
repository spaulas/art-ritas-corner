import {
  PaintingsFormFields,
  UpdatePaintingsFieldsFunction,
} from "context/FormProvider";
import React, { useState, useEffect, useContext } from "react";
import Select, { type Option } from "components/common/Select";
import data from "data.json";
import { LanguageContext } from "context/LanguageProvider";
import type { DataType, CategoryType } from "data";

type PaintingsFieldsProps = {
  fields: PaintingsFormFields;
  updatePaintingsFields: UpdatePaintingsFieldsFunction;
};

const paintingsCategory: CategoryType[] | undefined = (
  data as DataType
).categories.filter(({ id }) => id !== "nailArt");

const PaintingsFields = ({
  fields,
  updatePaintingsFields,
}: PaintingsFieldsProps) => {
  const { language } = useContext(LanguageContext);
  const [paintingsCategories, setPaintingsCategories] = useState<Option[]>([]);
  const [paintingsNames, setPaintingsNames] = useState<Option[]>([]);

  useEffect(function getPaintingsCategories() {
    const categoryOptions = paintingsCategory.reduce(
      (acc: Option[], category) => [
        ...acc,
        {
          label: category.title[language],
          value: category.id,
        },
      ],
      []
    );

    setPaintingsCategories(categoryOptions ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    function getPaintingsNames() {
      const namesOptions = paintingsCategory
        ?.find(({ id }) => id === fields.category)
        ?.images.reduce(
          (acc: Option[], painting) => [
            ...acc,
            {
              label: painting.title?.[language] ?? "",
              value: painting.id,
            },
          ],
          []
        );

      setPaintingsNames(namesOptions ?? []);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields.category]
  );

  return (
    <>
      <Select
        label="Catégorie"
        value={fields.category}
        options={paintingsCategories}
        onUpdate={(value) =>
          updatePaintingsFields({ category: value.toString(), painting: "" })
        }
      />
      <Select
        label="Peinture"
        value={fields.painting}
        options={paintingsNames}
        isDisabled={!fields.category}
        onUpdate={(value) => updatePaintingsFields({ painting: value.toString() })}
        infoMessage={!fields.category ? "Sélectionner une catégorie" : ""}
      />
    </>
  );
};

export default PaintingsFields;
