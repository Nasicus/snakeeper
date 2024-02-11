import { FC, useState } from "react";
import { AnimalReportEntryDocument } from "./useAnimalReportSubscription.tsx";
import { AnimalReportEntry } from "./animalReportEntry.ts";
import { Table, ActionIcon } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { FeedActivity } from "./activities/feedActivity.tsx";
import { ShedActivity } from "./activities/shedActivity.tsx";
import { WeighingActivity } from "./activities/weighingActivity.tsx";
import { AddReport } from "./addReport.tsx";

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
        <Table.Td>{report.date?.toDateString()}</Table.Td>
        <Table.Td>
          {report.type === "feeding" && <FeedActivity report={report} />}
          {report.type === "shedding" && <ShedActivity report={report} />}
          {report.type === "weighing" && <WeighingActivity report={report} />}
        </Table.Td>
        <Table.Td>{report.notes}</Table.Td>
        <Table.Td>
          <ActionIcon onClick={() => setReportToEdit(report)}>
            <IconPencil />
          </ActionIcon>
          <ActionIcon onClick={onDelete} ml="xs">
            <IconTrash />
          </ActionIcon>
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
