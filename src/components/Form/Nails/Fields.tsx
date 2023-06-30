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

type NailsFieldsProps = {
  fields: BasicFormFields & NailsFormFields;
  updateBasicFields: UpdateBasicFieldsFunction;
  updateNailsFields: UpdateNailsFieldsFunction;
};

type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

type ScheduleTimes = { start: number; end: number };

const nailsCategory: CategoryType | undefined = (
  data as DataType
).categories.find(({ id }) => id === "nailArt");

const NailsFields = ({ fields, updateNailsFields }: NailsFieldsProps) => {
  const { language } = useContext(LanguageContext);
  const busyTimesForSelectedDate = useRef<ScheduleTimes[]>([]);
  const categoryDuration = useRef<number>(1);
  const [nailsServiceOptions, setNailsServiceOptions] = useState<Option[]>([]);
  const [nailsScheduleOptions, setNailsScheduleOptions] = useState<Option[]>(
    []
  );

  const SCHEDULES_INTERVAL = 0.5;

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

  useEffect(
    function getNailsSchedules() {
      if (!fields.service) return;

      const weekDay = fields.date.toLocaleString("default", {
        weekday: "long",
      });
      const availableTimesForWeekDay =
        data.calendar.schedules[weekDay?.toLowerCase() as WeekDay];
      getBusyTimesForSelectedDate();

      categoryDuration.current =
        nailsCategory?.images[parseInt(fields.service)]?.duration ?? 0;

      const morningSchedules = getSchedulesFromAvailableHours(
        availableTimesForWeekDay.morning.start,
        availableTimesForWeekDay.morning.end
      );

      const afternoonSchedules = getSchedulesFromAvailableHours(
        availableTimesForWeekDay.afternoon.start,
        availableTimesForWeekDay.afternoon.end
      );

      setNailsScheduleOptions([...morningSchedules, ...afternoonSchedules]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields.service, fields.date]
  );

  const getBusyTimesForSelectedDate = () => {
    busyTimesForSelectedDate.current = data.calendar.busy.reduce(
      (acc: ScheduleTimes[], { start: busyStart, end: busyEnd }) => {
        const busyStartDate = new Date(busyStart);
        const busyEndDate = new Date(busyEnd);
        const day = 24 * 60 * 60 * 1000;

        const isOnTheSelectedDay =
          busyStartDate.getDate() === fields.date.getDate() &&
          Math.abs(busyStartDate.getTime() - fields.date.getTime()) < day;

        if (!isOnTheSelectedDay) {
          return acc;
        }

        return [
          ...acc,
          {
            start: busyStartDate.getHours() + busyStartDate.getMinutes() / 60,
            end: busyEndDate.getHours() + busyEndDate.getMinutes() / 60,
          },
        ];
      },
      []
    );
  };

  const getSchedulesFromAvailableHours = (
    start: number,
    end: number
  ): Option[] => {
    const hours = end - start;

    return Array(hours * 2)
      .fill(1)
      .reduce((acc, _value, index) => {
        const startInt = start + index * SCHEDULES_INTERVAL;
        const endInt = startInt + categoryDuration.current / 60;

        if (endInt > end) return acc;

        const finalValue = `${convertIntToHourString(
          startInt
        )} - ${convertIntToHourString(endInt)}`;

        const isDisabled = isTimeScheduleDisabled(startInt, endInt);

        return [
          ...acc,
          {
            label: finalValue,
            value: finalValue,
            isDisabled,
          },
        ];
      }, []);
  };

  const convertIntToHourString = (hour: number): string => {
    const minutes = (hour % 1) * 60;
    return `${Math.floor(hour)}h${minutes === 0 ? "00" : minutes}`;
  };

  const isTimeScheduleDisabled = (start: number, end: number) => {
    let isDisabled = false;

    busyTimesForSelectedDate.current = busyTimesForSelectedDate.current.reduce(
      (acc: ScheduleTimes[], busy) => {
        if (
          (start >= busy.start && start < busy.end) ||
          (end > busy.start && end <= busy.end) ||
          (start < busy.end && start + (busy.end - busy.start) < end)
        ) {
          isDisabled = true;

          if (start >= busy.end + SCHEDULES_INTERVAL) {
            return acc;
          }
        }
        return [...acc, busy];
      },
      []
    );

    return isDisabled;
  };

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
      <Select
        label="Calendrier"
        value={fields.schedule}
        options={nailsScheduleOptions}
        isDisabled={
          !fields.service || fields.date.getTime() === new Date(0).getTime()
        }
        onUpdate={(value: string) => updateNailsFields({ schedule: value })}
        infoMessage={
          !fields.service || fields.date.getTime() === new Date(0).getTime()
            ? "Sélectionner une service et une date"
            : ""
        }
      />
    </>
  );
};

export default NailsFields;
