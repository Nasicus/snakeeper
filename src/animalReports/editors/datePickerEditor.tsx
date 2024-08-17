import { DatePicker } from "@mantine/dates";
import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";

export const DatePickerEditor: FC<{
  report: AnimalReportEntry | null;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  defaultDate?: Date;
}> = ({ report, defaultDate, updateReport }) => {
  const lastDate = defaultDate;

  useEffect(() => {
    if (report && lastDate && !report?.date) {
      changeDate(lastDate);
    }
  }, [lastDate]);

  return (
    <>
      <strong>When</strong>
      <DatePicker
        defaultDate={report?.date || lastDate}
        value={report?.date || lastDate}
        onChange={changeDate}
      />
    </>
  );

  function changeDate(v: Date | null) {
    updateReport((prev) => ({
      ...prev,
      date: v || new Date(),
    }));
  }
};
