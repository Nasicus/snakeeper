import { FC, Dispatch, SetStateAction, useEffect } from "react";
import {
  AnimalReportEntry,
  ShedType,
  ShedTypeValues,
  shedTypeExpectedOrder,
} from "../../animalReportEntry.ts";
import { Select } from "@mantine/core";

export const SheddingActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  previousReports: AnimalReportEntry[];
}> = ({ report, previousReports, updateReport }) => {
  const latestShedType = previousReports.find(
    (r) => r.type === "shedding" && !!r.shedType,
  )?.shedType;

  const nextShedType = latestShedType
    ? shedTypeExpectedOrder[latestShedType]
    : "started";

  useEffect(() => {
    if (!report.shedType) {
      changeShedType(nextShedType);
    }
  }, [nextShedType]);

  return (
    <Select
      label="Shed type"
      value={report.shedType || nextShedType}
      data={Object.values(ShedType)}
      onChange={(v) => changeShedType(v as ShedTypeValues)}
    />
  );

  function changeShedType(v?: ShedTypeValues) {
    updateReport((prev) => ({
      ...prev,
      shedType: v || "started",
    }));
  }
};
