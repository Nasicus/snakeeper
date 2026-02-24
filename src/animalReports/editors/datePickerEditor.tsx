import { DatePicker } from "@mantine/dates";
import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { Text } from "@mantine/core";

export const DatePickerEditor: FC<{
  report: AnimalReportEntry | null;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  defaultDate?: Date;
}> = ({ report, defaultDate, updateReport }) => {
  const lastDate = defaultDate;

  useEffect(() => {
    if (report && lastDate && !report?.date) {
      changeDate(toDateString(lastDate));
    }
  }, [lastDate]);

  const dateValue = report?.date
    ? toDateString(report.date)
    : toDateString(lastDate);

  return (
    <>
      <Text fw={500} size="sm">
        When
      </Text>
      <DatePicker
        defaultDate={report?.date || lastDate}
        value={dateValue}
        onChange={changeDate}
      />
    </>
  );

  function changeDate(v: string | null) {
    updateReport((prev) => ({
      ...prev,
      date: v ? new Date(v) : new Date(),
    }));
  }
};

function toDateString(d: Date | undefined): string | null {
  if (!d) {
    return null;
  }

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
