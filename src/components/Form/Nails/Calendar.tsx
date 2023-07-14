import React, { useContext, useEffect, useState, useRef } from "react";
import Select, { type Option } from "components/common/Select";
import type {
  NailsFormFields,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";
import { LanguageContext } from "context/LanguageProvider";
import Calendar from "react-calendar";
import type { CategoryType, DataType } from "data";
import data from "data.json";
import "../styles.scss";

type NailsFormProps = {
  fields: NailsFormFields;
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

const NailsCalendar = (props: NailsFormProps) => {
  const today = new Date();
  const DISABLED_DAYS = 2;
  const MAX_MONTHS = 3;
  const SCHEDULES_INTERVAL = 0.5;

  const { fields, updateNailsFields } = props;
  const { language } = useContext(LanguageContext);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState<number>(-1);
  const [nailsScheduleOptions, setNailsScheduleOptions] = useState<Option[]>(
    []
  );
  const busyTimesForSelectedDate = useRef<ScheduleTimes[]>([]);
  const categoryDuration = useRef<number>(1);

  const leftMonthButton = document.getElementsByClassName(
    "react-calendar__navigation__arrow react-calendar__navigation__prev-button"
  )[0];
  const rightMonthButton = document.getElementsByClassName(
    "react-calendar__navigation__arrow react-calendar__navigation__next-button"
  )[0];

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

  useEffect(() => {
    setCurrentMonth(today.getMonth());
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
      <Calendar
        onChange={(value) => {
          if (value instanceof Date) {
            setSelectedDate(value);
            updateNailsFields({ date: value });
          }
        }}
        value={fields.date}
        locale={language}
        showNeighboringMonth={false}
        maxDetail="month"
        minDate={today}
        maxDate={
          new Date(new Date(today).setMonth(today.getMonth() + MAX_MONTHS))
        }
        className={getCalendarClassName()}
        onViewChange={(e) => console.log("on view change e = ", e)}
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

export default NailsCalendar;
