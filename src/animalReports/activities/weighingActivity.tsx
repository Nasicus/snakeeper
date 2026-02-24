import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { Text } from "@mantine/core";

export const WeighingActivity: FC<{ report: AnimalReportEntry }> = ({
  report,
}) => {
  return (
    <Text size="sm" span c="dimmed">
      {report.weightInGrams}g
    </Text>
  );
};
