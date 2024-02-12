import { FC, useState } from "react";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { useAnimalReportSubscription } from "./useAnimalReportSubscription.tsx";
import { AnimalReportEntry } from "./animalReportEntry.ts";
import { Flex, Title, ActionIcon, Table } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { updateDoc, deleteDoc, addDoc, collection } from "firebase/firestore";
import { firestoreDb } from "../firebase.ts";
import { ReportRow } from "./reportRow.tsx";
import { AddReport } from "./addReport.tsx";
import { Animal } from "../animal/animal.ts";

export const AnimalReports: FC<{
  animalId: string | undefined;
  updateAnimalFields: (animal: Partial<Animal>) => unknown;
}> = ({ animalId, updateAnimalFields }) => {
  const user = useAuthenticatedUser();

  const reports = useAnimalReportSubscription(animalId);
  const sortedReports = reports.sort(
    (a, b) =>
      (b.date || new Date()).getTime() - (a.date || new Date()).getTime(),
  );

  const [reportToAdd, setReportToAdd] = useState<AnimalReportEntry | null>(
    null,
  );

  return (
    <>
      <Flex align="center" justify="flex-start">
        <Title order={3}>Reports</Title>
        <ActionIcon
          ml="sm"
          onClick={() => setReportToAdd({ type: "weighing" })}
        >
          <IconPlus />
        </ActionIcon>
      </Flex>
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
      <AddReport
        report={reportToAdd}
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
