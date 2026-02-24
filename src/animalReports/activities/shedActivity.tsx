import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { Badge } from "@mantine/core";

export const ShedActivity: FC<{ report: AnimalReportEntry }> = ({
  report,
}) => {
  return (
    <Badge variant="outline" color="yellow" size="sm">
      {report.shedType}
    </Badge>
  );
};
