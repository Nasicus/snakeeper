import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AnimalReportEntry } from "../../animalReportEntry.ts";
import { NumberInput } from "@mantine/core";

export const WeighingActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  previousReports: AnimalReportEntry[];
}> = ({ report, previousReports, updateReport }) => {
  const previousWeight = previousReports.find(
    (r) => r.type === "weighing" && !!r.weightInGrams,
  )?.weightInGrams;

  useEffect(() => {
    if (!report.weightInGrams) {
      changeWeight(previousWeight);
    }
  }, [previousWeight]);

  return (
    <NumberInput
      label="Weight in grams"
      defaultValue={previousWeight}
      value={report.weightInGrams}
      onChange={(value) =>
        changeWeight(typeof value === "number" ? value : parseFloat(value))
      }
    />
  );

  function changeWeight(v?: number) {
    updateReport((prev) => ({
      ...prev,
      weightInGrams: v,
    }));
  }
};
