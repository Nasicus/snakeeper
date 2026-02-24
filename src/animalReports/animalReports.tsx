import { FC, useState } from "react";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { AnimalReportEntryDocument } from "./useAnimalReportSubscription.tsx";
import { AnimalReportEntry } from "./animalReportEntry.ts";
import { Group, Title, Card, Table, Switch, Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { updateDoc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { firestoreDb } from "../firebase.ts";
import { ReportRow } from "./reportRow.tsx";
import { AddReport } from "./addReport.tsx";
import { Animal } from "../animal/animal.ts";

export const AnimalReports: FC<{
  animalId: string | undefined;
  reports: AnimalReportEntryDocument[];
  updateAnimalFields: (animal: Partial<Animal>) => unknown;
}> = ({ animalId, reports, updateAnimalFields }) => {
  const user = useAuthenticatedUser();

  const sortedReports = [...reports].sort(
    (a, b) =>
      (b.date || new Date()).getTime() - (a.date || new Date()).getTime(),
  );

  const [reportToAdd, setReportToAdd] = useState<AnimalReportEntry | null>(
    null,
  );

  const [defaultDateMode, setDefaultDateMode] = useState<
    "today" | "lastReport"
  >("today");

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={3}>Reports</Title>
        <Group>
          <Switch
            label={
              defaultDateMode === "today"
                ? "Use 'Today' as default date"
                : "Use last report date as default date"
            }
            checked={defaultDateMode === "today"}
            onChange={(e) =>
              setDefaultDateMode(
                e.currentTarget.checked ? "today" : "lastReport",
              )
            }
          />
          <Button
            leftSection={<IconPlus size={16} />}
            size="sm"
            onClick={() => setReportToAdd({ type: "weighing" })}
          >
            Add Report
          </Button>
        </Group>
      </Group>

      <Card shadow="sm" padding="md" withBorder>
        {sortedReports.length === 0 ? (
          <Text c="dimmed" ta="center" py="lg">
            No reports yet
          </Text>
        ) : (
          <Table striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Activities</Table.Th>
                <Table.Th>Notes</Table.Th>
                <Table.Th></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {sortedReports.map((report) => (
                <ReportRow
                  key={report.id}
                  report={report}
                  onUpdate={async (u) => {
                    await updateDoc(report.docRef, u);
                    updateAnimalIfRequired(u);
                  }}
                  onDelete={() => deleteDoc(report.docRef)}
                  previousReports={sortedReports}
                />
              ))}
            </Table.Tbody>
          </Table>
        )}
      </Card>

      <AddReport
        report={reportToAdd}
        defaultDateMode={defaultDateMode}
        previousReports={reports}
        updateReport={setReportToAdd}
        onSave={addReport}
        onCancel={() => setReportToAdd(null)}
      />
    </>
  );

  async function addReport() {
    if (!reportToAdd) {
      return;
    }

    await addDoc(
      collection(firestoreDb, `users/${user.uid}/animals/${animalId}/reports`),
      reportToAdd,
    );

    updateAnimalIfRequired(reportToAdd);

    setReportToAdd(null);
  }

  function updateAnimalIfRequired(report: AnimalReportEntry) {
    if (report.type !== "born") {
      return;
    }

    updateAnimalFields({ dateOfBirth: report.date });
  }
};
