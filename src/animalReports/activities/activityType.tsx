import { FC } from "react";
import { ReportTypeValues } from "../animalReportEntry.ts";
import { Text } from "@mantine/core";

export const ActivityType: FC<{ type?: ReportTypeValues }> = ({ type }) => {
  return <Text size="sm">{type}</Text>;
};
