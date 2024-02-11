import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { ActivityType } from "./activityType.tsx";

export const ShedActivity: FC<{ report: AnimalReportEntry }> = ({ report }) => {
  return (
    <>
      <div>
        <ActivityType type={report.type} />
      </div>
      <div>
        <strong>Shed type:</strong> {report.shedType}
      </div>
    </>
  );
};
