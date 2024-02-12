import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AnimalReportEntry } from "../../animalReportEntry.ts";
import { Switch, TextInput } from "@mantine/core";

export const FeedActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  previousReports: AnimalReportEntry[];
}> = ({ report, previousReports, updateReport }) => {
  const latestFoodType = previousReports.find(
    (r) => r.type === "feeding" && !!r.foodType,
  )?.foodType;

  useEffect(() => {
    if (latestFoodType && !report.foodType) {
      changeFoodType(latestFoodType);
    }
  }, [latestFoodType]);

  useEffect(() => {
    if (report.didEat === undefined) {
      changeDidEat(true);
    }
  }, []);

  return (
    <>
      <Switch
        mt="xs"
        label="Did eat"
        checked={report.didEat === undefined ? true : report.didEat}
        onChange={(e) => changeDidEat(e.currentTarget.checked)}
      />

      <TextInput
        label="Food type"
        defaultValue={latestFoodType}
        value={report.foodType || ""}
        onChange={(e) => changeFoodType(e.currentTarget.value)}
      />
    </>
  );

  function changeFoodType(newFoodType: string) {
    updateReport((prev) => ({
      ...prev,
      foodType: newFoodType,
    }));
  }

  function changeDidEat(didEat: boolean) {
    updateReport((prev) => ({
      ...prev,
      didEat,
    }));
  }
};
