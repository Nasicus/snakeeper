import { FC, useState, Dispatch, SetStateAction } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";
import {
  Table,
  ActionIcon,
  Button,
  Modal,
  Select,
  TextInput,
  Switch,
  Textarea,
  NumberInput,
  Flex,
  Title,
  Text,
} from "@mantine/core";
import { addDoc, collection, deleteDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "./firebase.ts";
import {
  IconDeviceFloppy,
  IconPlus,
  IconPencil,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import {
  useAnimalReportSubscription,
  AnimalReportEntryDocument,
} from "./useAnimalReportSubscription.tsx";
import {
  AnimalReportEntry,
  ReportType,
  ReportTypeValues,
  ShedType,
  ShedTypeValues,
} from "./animalReportEntry.ts";
import { DatePickerInput } from "@mantine/dates";
import { useAnimalSubscription } from "./useAnimalSubscription.tsx";
import { Animal } from "./animal.ts";
import { AnimalNameEditor } from "./AnimalNameEditor.tsx";
import { AnimalTypeEditor } from "./AnimalTypeEditor.tsx";
import { AnimalSubTypeEditor } from "./AnimalSubTypeEditor.tsx";
import { AnimalSexEditor } from "./AnimalSexEditor.tsx";
import { AnimalDateOfBirthEditor } from "./AnimalDateOfBirthEditor.tsx";

export const AnimalDetailPage: FC = () => {
  const { animalId } = useParams();
  const user = useAuthenticatedUser();

  const reports = useAnimalReportSubscription(animalId);
  const animal = useAnimalSubscription(animalId);

  const [reportToAdd, setReportToAdd] = useState<AnimalReportEntry | null>(
    null,
  );

  if (!animal) {
    return <>Animal does not exist.</>;
  }

  return (
    <>
      <AnimalDetails
        animal={animal}
        onUpdate={(u) => updateDoc(animal.docRef, u)}
      />

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

const ReportRow: FC<{
  report: AnimalReportEntryDocument;
  onDelete: () => unknown;
  onUpdate: (update: AnimalReportEntry) => unknown;
}> = ({ report, onUpdate, onDelete }) => {
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

const AnimalDetails: FC<{
  animal: Animal;
  onUpdate: (animal: Animal) => unknown;
}> = ({ animal, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const isEditMode = !!animalToEdit;

  return (
    <>
      <Flex align="center" justify="flex-start">
        {!isEditMode && (
          <Title order={2} mr="sm">
            {animal.name}
          </Title>
        )}
        {isEditMode && (
          <AnimalNameEditor
            animal={animalToEdit}
            changeAnimal={setAnimalToEdit}
          />
        )}
        {!isEditMode && (
          <>
            <ActionIcon onClick={() => setAnimalToEdit(animal)} mr="sm">
              <IconPencil />
            </ActionIcon>
            <Link to="/">Back</Link>
          </>
        )}
        {isEditMode && (
          <>
            <ActionIcon
              onClick={() => {
                onUpdate(animalToEdit);
                setAnimalToEdit(null);
              }}
              disabled={!animalToEdit?.name}
              ml="sm"
              mr="sm"
            >
              <IconDeviceFloppy />
            </ActionIcon>
            <ActionIcon onClick={() => setAnimalToEdit(null)}>
              <IconX />
            </ActionIcon>
          </>
        )}
      </Flex>

      <Flex justify="space-between" mt="sm" mb="xl">
        <div>
          <Text fw={700} display="block">
            Type
          </Text>
          {!isEditMode && animal.type}
          {isEditMode && (
            <AnimalTypeEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Subtype
          </Text>
          {!isEditMode && animal.subType}
          {isEditMode && (
            <AnimalSubTypeEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Sex
          </Text>
          {!isEditMode && animal.sex}
          {isEditMode && (
            <AnimalSexEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
        <div>
          <Text fw={700} display="block">
            Date Of Birth
          </Text>

          {!isEditMode && <>{animal.dateOfBirth?.toDateString() || "-"}</>}
          {isEditMode && (
            <AnimalDateOfBirthEditor
              animal={animalToEdit}
              changeAnimal={setAnimalToEdit}
            />
          )}
        </div>
      </Flex>
    </>
  );
};

const FeedActivity: FC<{ report: AnimalReportEntry }> = ({ report }) => {
  return (
    <>
      <div>
        <ActivityType type={report.type} />
      </div>
      <div>
        <strong>Did eat:</strong> {report.didEat ? "Yes" : "No"}
      </div>
      <div>
        <strong>Food type:</strong> {report.foodType}
      </div>
    </>
  );
};

const ShedActivity: FC<{ report: AnimalReportEntry }> = ({ report }) => {
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

const WeighingActivity: FC<{ report: AnimalReportEntry }> = ({ report }) => {
  return (
    <>
      <div>
        <ActivityType type={report.type} />
      </div>
      <div>
        <strong>Weight:</strong> {report.weightInGrams} grams
      </div>
    </>
  );
};

const ActivityType: FC<{ type?: ReportTypeValues }> = ({ type }) => {
  return (
    <>
      <strong>Activity:</strong> {type}
    </>
  );
};

const AddReport: FC<{
  report: AnimalReportEntry | null;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  onSave: () => unknown;
  onCancel: () => unknown;
}> = ({ report, updateReport, onSave, onCancel }) => {
  return (
    <Modal
      opened={!!report}
      withCloseButton
      onClose={onCancel}
      title="Add report"
    >
      <DatePickerInput
        label="When"
        value={report?.date}
        onChange={(v) =>
          updateReport((prev) => ({
            ...prev,
            date: v || new Date(),
          }))
        }
      />
      <Select
        label="What"
        value={report?.type}
        data={Object.values(ReportType)}
        onChange={(v) =>
          updateReport((prev) => ({
            ...prev,
            shedType: undefined,
            weightInGrams: undefined,
            didEat: undefined,
            foodType: undefined,
            type: (v as ReportTypeValues) || "misc",
          }))
        }
      />
      {report?.type === "feeding" && (
        <FeedActivityEditor report={report} updateReport={updateReport} />
      )}

      {report?.type === "shedding" && (
        <SheddingActivityEditor report={report} updateReport={updateReport} />
      )}

      {report?.type === "weighing" && (
        <WeighingActivityEditor report={report} updateReport={updateReport} />
      )}

      <Textarea
        label="Notes"
        value={report?.notes || ""}
        onChange={(e) =>
          updateReport((prev) => ({
            ...prev,
            notes: e.currentTarget.value,
          }))
        }
      />

      <Button
        mt="xs"
        leftSection={<IconDeviceFloppy size={14} />}
        onClick={onSave}
      >
        Save
      </Button>
    </Modal>
  );
};

const FeedActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({ report, updateReport }) => {
  return (
    <>
      <Switch
        mt="xs"
        label="Did eat"
        checked={report.didEat}
        onChange={(e) =>
          updateReport((prev) => ({
            ...prev,
            didEat: e.currentTarget.checked,
          }))
        }
      />

      <TextInput
        label="Food type"
        value={report.foodType || ""}
        onChange={(e) =>
          updateReport((prev) => ({
            ...prev,
            foodType: e.currentTarget.value,
          }))
        }
      />
    </>
  );
};

const SheddingActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({ report, updateReport }) => {
  return (
    <Select
      label="Shed type"
      value={report.shedType}
      data={Object.values(ShedType)}
      onChange={(v) =>
        updateReport((prev) => ({
          ...prev,
          shedType: (v as ShedTypeValues) || "started",
        }))
      }
    />
  );
};

const WeighingActivityEditor: FC<{
  report: AnimalReportEntry;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({ report, updateReport }) => {
  return (
    <NumberInput
      label="Weight in grams"
      value={report.weightInGrams}
      onChange={(value) =>
        updateReport((prev) => ({
          ...prev,
          weightInGrams: typeof value === "number" ? value : parseFloat(value),
        }))
      }
    />
  );
};
