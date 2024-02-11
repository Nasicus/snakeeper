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

export const AnimalReports: FC<{ animalId: string | undefined }> = ({
  animalId,
}) => {
  const user = useAuthenticatedUser();

  const reports = useAnimalReportSubscription(animalId);

  const [reportToAdd, setReportToAdd] = useState<AnimalReportEntry | null>(
    null,
  );

  return (
    <>
      <Flex align="center" justify="flex-start">
        <Title order={3}>Reports</Title>
        <ActionIcon
          ml="sm"
          onClick={() => setReportToAdd({ type: "feeding", date: new Date() })}
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
          {reports
            .sort(
              (a, b) =>
                (b.date || new Date()).getTime() -
                (a.date || new Date()).getTime(),
            )
            .map((report) => (
              <ReportRow
                key={report.id}
                report={report}
                onUpdate={(u) => updateDoc(report.docRef, u)}
                onDelete={() => deleteDoc(report.docRef)}
              />
            ))}
        </Table.Tbody>
      </Table>
      <AddReport
        report={reportToAdd}
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
    setReportToAdd(null);
  }
};
