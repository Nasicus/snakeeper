import { DatePickerInput } from "@mantine/dates";
import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";

export const DatePickerEditor: FC<{
  report: AnimalReportEntry | null;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  previousReports: AnimalReportEntry[];
}> = ({ report, previousReports, updateReport }) => {
  const lastDate = previousReports[0]?.date;

  useEffect(() => {
    if (report && lastDate && !report?.date) {
      changeDate(lastDate);
    }
  }, [lastDate]);

  return (
    <DatePickerInput
      label="When"
      value={report?.date || lastDate}
      onChange={changeDate}
    />
  );

  function changeDate(v: Date | null) {
    updateReport((prev) => ({
      ...prev,
      date: v || new Date(),
    }));
  }
};
