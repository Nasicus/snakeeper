import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { ActivityType } from "./activityType.tsx";

export const FeedActivity: FC<{ report: AnimalReportEntry }> = ({ report }) => {
  return (
    <>
      <div>
        <ActivityType type={report.type} />
      </div>
      <div>
        <strong>Did eat:</strong> {report.didEat ? "Yes" : "No"}
      </div>
      <div>
        <strong>Food type:</strong> {report.foodType}
      </div>
    </>
  );
};
