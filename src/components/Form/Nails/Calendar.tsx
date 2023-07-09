import React, { useContext, useEffect, useState } from "react";
import "../styles.scss";
import type {
  NailsFormFields,
  UpdateNailsFieldsFunction,
} from "context/FormProvider";
import { LanguageContext } from "context/LanguageProvider";
import Calendar from "react-calendar";

type NailsFormProps = {
  fieldDate: NailsFormFields["date"];
  updateNailsFields: UpdateNailsFieldsFunction;
};

const NailsCalendar = (props: NailsFormProps) => {
  const today = new Date();
  const DISABLED_DAYS = 2;
  const MAX_MONTHS = 3;

  const { fieldDate, updateNailsFields } = props;
  const { language } = useContext(LanguageContext);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentMonth, setCurrentMonth] = useState<number>(-1);

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

  useEffect(() => {
    setCurrentMonth(today.getMonth());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Calendar
      onChange={(value) => {
        if (value instanceof Date) {
          setSelectedDate(value);
          updateNailsFields({ date: value });
        }
      }}
      value={fieldDate}
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
  );
};

export default NailsCalendar;
