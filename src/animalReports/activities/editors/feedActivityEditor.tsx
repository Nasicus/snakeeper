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

  return (
    <>
      <Switch
        mt="xs"
        label="Did eat"
        checked={report.didEat}
        onChange={(e) =>
          updateReport((prev) => ({
            ...prev,
            didEat: e.currentTarget.checked,
          }))
        }
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
};
