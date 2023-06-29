import React, { useContext, useEffect, useState, useRef } from "react";
import Input from "components/common/Input";
import Select, { type Option } from "components/common/Select";
import "./styles.scss";
import type {
  BasicFormFields,
  NailsFormFields,
  UpdateBasicFieldsFunction,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";
import data from "data.json";
import { LanguageContext } from "components/LanguageProvider";
import { CategoryProps } from "components/Category";
import Calendar from "react-calendar";

type NailsFormProps = {
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

const nailsCategory: CategoryProps | undefined = data.categories.find(
  ({ id }) => id === "nailArt"
);

// TODO: separate service and schedule dropdowns and calendar as well
const NailsForm = (props: NailsFormProps) => {
  const { fields, updateBasicFields, updateNailsFields } = props;
  const { language } = useContext(LanguageContext);
  const busyTimesForSelectedDate = useRef<ScheduleTimes[]>([]);
  const categoryDuration = useRef<number>(1);
  const [nailsServiceOptions, setNailsServiceOptions] = useState<Option[]>([]);
  const [nailsScheduleOptions, setNailsScheduleOptions] = useState<Option[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const leftMonthButton = document.getElementsByClassName(
    "react-calendar__navigation__arrow react-calendar__navigation__prev-button"
  )[0];
  const rightMonthButton = document.getElementsByClassName(
    "react-calendar__navigation__arrow react-calendar__navigation__next-button"
  )[0];
  const SCHEDULES_INTERVAL = 0.5;
  const DISABLED_DAYS = 3;
  const MAX_MONTHS = 3;

  leftMonthButton?.addEventListener("click", () => {
    if (currentMonth > today.getMonth()) {
      setCurrentMonth(currentMonth - 1);
    }
  });

  rightMonthButton?.addEventListener("click", () => {
    if (currentMonth < today.getMonth() + MAX_MONTHS) {
      setCurrentMonth(currentMonth + 1);
    }
  });

  useEffect(function getNailsServices() {
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

  const getMonthDays = (date: Date) => {
    switch (date.getMonth()) {
      case 0:
      case 2:
      case 4:
      case 6:
      case 7:
      case 9:
      case 11:
        return 31;
      case 1:
        return 28; // TODO: checky year!
      default:
        return 30;
    }
  };

  const getCalendarClassName = () => {
    const firstMonthDay = getMonthDays(today);
    const firstMonthDisabledDays =
      today.getDate() + DISABLED_DAYS > firstMonthDay
        ? firstMonthDay
        : today.getDate() + DISABLED_DAYS;
    const secondMonthDisabledDays =
      today.getDate() + DISABLED_DAYS > firstMonthDay
        ? DISABLED_DAYS - (firstMonthDay - today.getDate())
        : 0;

    let finalDisabledDays = 0;
    if (currentMonth === today.getMonth()) {
      finalDisabledDays = firstMonthDisabledDays;
    } else if (currentMonth === today.getMonth() + 1) {
      finalDisabledDays = secondMonthDisabledDays;
    }

    let selectedDayClassName = "";
    if (selectedDate && selectedDate.getMonth() === currentMonth) {
      selectedDayClassName = `calendar-selected-day-${selectedDate.getDate()}`;
    }

    let disabledMonthArrowsClassName = "";
    if (currentMonth === today.getMonth()) {
      disabledMonthArrowsClassName = "calendar-disabled-left-arrow";
    } else if (currentMonth === today.getMonth() + MAX_MONTHS) {
      disabledMonthArrowsClassName = "calendar-disabled-right-arrow";
    }

    return `calendar-disabled-days-${finalDisabledDays} ${selectedDayClassName} ${disabledMonthArrowsClassName}`;
  };

  return (
    <div className="nails-form">
      <div className="fields">
        <Input
          type="text"
          label="Nom"
          value={fields.name}
          onUpdate={(value: string) => updateBasicFields({ name: value })}
        />
        <Input
          type="email"
          label="Email"
          value={fields.email}
          onUpdate={(value: string) => updateBasicFields({ email: value })}
        />
        <Input
          type="phone"
          label="Numéro de téléphone"
          value={fields.phone}
          onUpdate={(value: string) => updateBasicFields({ phone: value })}
        />
        <Select
          label="Genre"
          options={[
            { label: "Clous", value: "nails" },
            { label: "Peintures", value: "paintings" },
          ]}
          value={fields.type}
          onUpdate={(value: string) =>
            updateBasicFields({ type: value as BasicFormFields["type"] })
          }
        />
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
          isDisabled={!fields.service || !selectedDate}
          onUpdate={(value: string) => updateNailsFields({ schedule: value })}
          infoMessage={
            !fields.service || !selectedDate
              ? "Sélectionner une prestation et une date"
              : ""
          }
        />
      </div>

      <div className="fields">
        <Calendar
          onChange={(value) => {
            if (value instanceof Date) {
              setSelectedDate(value);
              console.log("on change value = ", typeof value);
              updateNailsFields({ date: value });
            }
          }}
          onDrillUp={() => console.log("on click month")}
          value={fields.date}
          locale={language}
          showNeighboringMonth={false}
          maxDetail="month"
          minDate={today}
          maxDate={
            new Date(new Date(today).setMonth(today.getMonth() + MAX_MONTHS))
          }
          className={getCalendarClassName()}
        />
      </div>
    </div>
  );
};

export default NailsForm;
