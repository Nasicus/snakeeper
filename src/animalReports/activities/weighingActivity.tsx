import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { ActivityType } from "./activityType.tsx";

export const WeighingActivity: FC<{ report: AnimalReportEntry }> = ({
  report,
}) => {
  return (
    <>
      <div>
        <ActivityType type={report.type} />
      </div>
      <div>
        <strong>Weight:</strong> {report.weightInGrams} grams
      </div>
    </>
  );
};
