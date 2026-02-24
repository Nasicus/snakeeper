import { FC, useState } from "react";
import { AnimalReportEntryDocument } from "./useAnimalReportSubscription.tsx";
import { AnimalReportEntry } from "./animalReportEntry.ts";
import { Table, ActionIcon, Badge, Group } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { FeedActivity } from "./activities/feedActivity.tsx";
import { ShedActivity } from "./activities/shedActivity.tsx";
import { WeighingActivity } from "./activities/weighingActivity.tsx";
import { AddReport } from "./addReport.tsx";
import { ActivityType } from "./activities/activityType.tsx";
import dayjs from "dayjs";

const activityColor: Record<string, string> = {
  feeding: "green",
  shedding: "yellow",
  weighing: "blue",
  born: "grape",
  died: "dark",
};

export const ReportRow: FC<{
  report: AnimalReportEntryDocument;
  onDelete: () => unknown;
  onUpdate: (update: AnimalReportEntry) => unknown;
  previousReports: AnimalReportEntry[];
}> = ({ report, onUpdate, onDelete, previousReports }) => {
  const [reportToEdit, setReportToEdit] = useState<AnimalReportEntry | null>(
    null,
  );

  return (
    <>
      <Table.Tr key={report.id}>
        <Table.Td>
          {report.date ? dayjs(report.date).format("MMM D, YYYY") : "-"}
        </Table.Td>
        <Table.Td>
          <Group gap="xs" wrap="wrap">
            <Badge color={activityColor[report.type || ""] || "gray"} variant="light">
              {report.type}
            </Badge>
            {report.type === "feeding" && <FeedActivity report={report} />}
            {report.type === "shedding" && <ShedActivity report={report} />}
            {report.type === "weighing" && <WeighingActivity report={report} />}
            {(report.type === "born" || report.type === "died") && (
              <ActivityType type={report.type} />
            )}
          </Group>
        </Table.Td>
        <Table.Td>{report.notes}</Table.Td>
        <Table.Td>
          <Group gap="xs" wrap="nowrap">
            <ActionIcon
              variant="subtle"
              onClick={() => setReportToEdit(report)}
            >
              <IconPencil size={18} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="red" onClick={onDelete}>
              <IconTrash size={18} />
            </ActionIcon>
          </Group>
        </Table.Td>
      </Table.Tr>
      <AddReport
        report={reportToEdit}
        previousReports={previousReports}
        updateReport={setReportToEdit}
        onSave={() => {
          onUpdate(reportToEdit!);
          setReportToEdit(null);
        }}
        onCancel={() => setReportToEdit(null)}
      />
    </>
  );
};
