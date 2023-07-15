import React, { useContext, useEffect, useState, useRef } from "react";
import Select, { type Option } from "components/common/Select";
import "../styles.scss";
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
import PhotoInput from "components/common/PhotoInput";

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
  const categoryDuration = useRef<number>(1);
  const [nailsServiceOptions, setNailsServiceOptions] = useState<Option[]>([]);

  useEffect(function getNailsServices() {
    const nailsOptions = nailsCategory?.images.reduce(
      (acc: Option[], category) => [
        ...acc,
        {
          label: category.title[language],
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
        value={fields.service}
        options={nailsServiceOptions}
        onUpdate={(value: string) =>
          updateNailsFields({ service: value, schedule: "" })
        }
        infoMessage={
          fields.service ? `Durée de: ${categoryDuration.current} min` : ""
        }
      />
      <Textbox
        isSmall
        label="Remarques"
        value={fields.notes}
        onUpdate={(value: string) => updateNailsFields({ notes: value })}
      />
      <PhotoInput label="Show examples" value="" onUpdate={() => console.log('update')} />
    </>
  );
};

export default NailsFields;
