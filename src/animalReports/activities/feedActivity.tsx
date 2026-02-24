import { FC } from "react";
import { AnimalReportEntry } from "../animalReportEntry.ts";
import { Badge, Text } from "@mantine/core";

export const FeedActivity: FC<{ report: AnimalReportEntry }> = ({
  report,
}) => {
  return (
    <>
      <Badge variant="outline" color={report.didEat ? "green" : "red"} size="sm">
        {report.didEat ? "ate" : "refused"}
      </Badge>
      {report.foodType && (
        <Text size="sm" span c="dimmed">
          {report.foodType}
        </Text>
      )}
    </>
  );
};
