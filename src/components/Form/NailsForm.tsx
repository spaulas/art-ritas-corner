import React, { useContext } from "react";
import Input from "components/common/Input";
import Select, { type Option } from "components/common/Select";
import "./styles.scss";
import {
  BasicFormFields,
  NailsFormFields,
  UpdateBasicFieldsFunction,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";
import data from "data.json";
import { LanguageContext } from "components/LanguageProvider";
import { CategoryProps } from "components/Category";

type NailsFormProps = {
  fields: BasicFormFields & NailsFormFields;
  updateBasicFields: UpdateBasicFieldsFunction;
  updateNailsFields: UpdateNailsFieldsFunction;
};

const NailsForm = (props: NailsFormProps) => {
  const { fields, updateBasicFields, updateNailsFields } = props;
  const { language } = useContext(LanguageContext);

  // TODO: change this in other to only run the find once!
  const nailsCategory: CategoryProps | undefined = data.categories.find(
    ({ id }) => id === "nailArt"
  );

  // TODO: create nails info tooltip when one is selected!

  const getNailsServices = (): Option[] => {
    const nailsOptions = nailsCategory?.images.reduce(
      (acc: Option[], category, index) => [
        ...acc,
        {
          label: category.title[language],
          value: index.toString(),
        },
      ],
      []
    );

    return nailsOptions ?? [];
  };

  // TODO: should recalculate when the service or date change!
  const getNailsSchedules = (): Option[] => {
    // TODO: Add disabled times!
    // TODO: Get date from fields
    const tempDate = new Date();
    const weekDay = tempDate.toLocaleString("default", { weekday: "long" });
    const availableTimes =
      data.calendar.schedules[
        weekDay.toLowerCase() as
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday"
      ];

    const categoryDuration =
      nailsCategory?.images[parseInt(fields.service)]?.duration ?? 0;

    const morningSchedules = getSchedulesFromAvailableHours(
      availableTimes.morning.start,
      availableTimes.morning.end,
      categoryDuration
    );

    const afternoonSchedules = getSchedulesFromAvailableHours(
      availableTimes.afternoon.start,
      availableTimes.afternoon.end,
      categoryDuration
    );

    return [...morningSchedules, ...afternoonSchedules];
  };

  const getSchedulesFromAvailableHours = (
    start: number,
    end: number,
    categoryDuration: number
  ): Option[] => {
    const SCHEDULES_INTERVAL = 0.5;
    const hours = end - start;

    return Array(hours * 2)
      .fill(1)
      .reduce((acc, _value, index) => {
        const startInt = start + index * SCHEDULES_INTERVAL;
        const endInt = startInt + categoryDuration / 60;

        if (endInt > end) return acc;

        const finalValue = `${convertIntToHourString(
          startInt
        )} - ${convertIntToHourString(endInt)}`

        return [
          ...acc,
          {
            label: finalValue,
            value: finalValue,
          },
        ];
      }, []);
  };

  const convertIntToHourString = (hour: number): string => {
    const minutes= (hour % 1) * 60
    return `${Math.floor(hour)}h${minutes === 0 ? "00" : minutes}`;
  };

  return (
    <div className="nails-form">
      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={fields.name}
          onUpdate={(value: string) => updateBasicFields("name", value)}
        />
        <Input
          type="email"
          label="Email"
          value={fields.email}
          onUpdate={(value: string) => updateBasicFields("email", value)}
        />
        <Input
          type="phone"
          label="Numéro de téléphone"
          value={fields.phone}
          onUpdate={(value: string) => updateBasicFields("phone", value)}
        />
        <Select
          label="Type"
          options={[
            { label: "Clous", value: "nails" },
            { label: "Peintures", value: "paintings" },
          ]}
          value={fields.type}
          onUpdate={(value: string) => updateBasicFields("type", value)}
        />
        <Select
          label="Service"
          value={fields.service}
          options={getNailsServices()}
          onUpdate={(value: string) => updateNailsFields("service", value)}
        />
        <Select
          label="Schedule"
          value={fields.schedule}
          options={getNailsSchedules()}
          isDisabled={!fields.service} /* TODO: add fields.date */
          onUpdate={(value: string) => updateNailsFields("schedule", value)}
        />
      </div>

      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={fields.name}
          onUpdate={(value: string) => updateBasicFields("name", value)}
        />
      </div>
    </div>
  );
};

export default NailsForm;
