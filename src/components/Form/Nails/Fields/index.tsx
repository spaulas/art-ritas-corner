import React, { useContext, useEffect, useState } from "react";
import Select, { type Option } from "components/common/Select";
import "../../styles.scss";
import type {
  BasicFormFields,
  NailsFormFields,
  UpdateBasicFieldsFunction,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";
import data from "data.json";
import { LanguageContext } from "context/LanguageProvider";
import type { CategoryType, DataType } from "data";
import Textbox from "components/common/Textbox";
import PhotoInput from "components/common/PhotoInput/index";

type NailsFieldsProps = {
  fields: BasicFormFields & NailsFormFields;
  updateBasicFields: UpdateBasicFieldsFunction;
  updateNailsFields: UpdateNailsFieldsFunction;
};

const nailsCategory: CategoryType | undefined = (
  data as DataType
).categories.find(({ id }) => id === "nailArt");

const NailsFields = ({ fields, updateNailsFields }: NailsFieldsProps) => {
  const { language } = useContext(LanguageContext);
  const [nailsServiceOptions, setNailsServiceOptions] = useState<Option[]>([]);

  useEffect(function getNailsServices() {
    const nailsOptions = nailsCategory?.images.reduce(
      (acc: Option[], category) => [
        ...acc,
        {
          label: category.title?.[language] ?? "",
          value: category.id,
        },
      ],
      []
    );

    setNailsServiceOptions(nailsOptions ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Select
        label="Service"
        isMultiple
        value={fields.services}
        options={nailsServiceOptions}
        onUpdate={(value) => {
          if (typeof value !== "string") {
            updateNailsFields({ services: value, schedule: "" });
          }
        }}
      />
      <Textbox
        isSmall
        label="Remarques"
        value={fields.notes}
        onUpdate={(value) => updateNailsFields({ notes: value })}
      />
      <PhotoInput
        label="Show examples"
        value={fields.photos}
        onUpdate={(value) => updateNailsFields({ photos: value })}
      />
    </>
  );
};

export default NailsFields;
