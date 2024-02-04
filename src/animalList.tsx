import { FC, useState, Dispatch, SetStateAction } from "react";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "./firebase.ts";
import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";
import { Table, Input, ActionIcon, Select } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconTrash,
  IconPencil,
  IconX,
} from "@tabler/icons-react";

type AnimalSex = "male" | "female";

type Animal = {
  id?: string;
  name?: string;
  type?: string;
  subType?: string;
  sex?: AnimalSex;
};

export const AnimalList: FC = () => {
  const user = useAuthenticatedUser();

  const { data, refetch } = useQuery({
    queryKey: ["animals", user.uid],
    queryFn: getAnimals,
  });

  const [animalToAdd, setAnimalToAdd] = useState<Animal | null>(null);

  return (
    <>
      <h2>Animals</h2>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Subtype</Table.Th>
            <Table.Th>Sex</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data?.map((a) => (
            <ExistingAnimalRow
              key={a.id}
              animal={a}
              onDelete={() => deleteAnimal(a.docRef)}
              onUpdate={(u) => updateAnimal(a.docRef, u)}
            />
          ))}
          <EditAnimalRow
            animal={animalToAdd}
            changeAnimal={setAnimalToAdd}
            saveChanges={addAnimal}
          />
        </Table.Tbody>
      </Table>
    </>
  );

  async function getAnimals() {
    try {
      const animals = await getDocs(
        collection(firestoreDb, `users/${user?.uid}/animals`),
      );

      return animals.docs.map((doc) => {
        const data = doc.data();
        return {
          name: data.name,
          id: doc.id,
          type: data.type,
          subType: data.subType,
          sex: data.sex,
          docRef: doc.ref,
        };
      });
    } catch (e) {
      console.error("Error getting animals: ", e);
    }
  }

  async function addAnimal() {
    await addDoc(
      collection(firestoreDb, `users/${user.uid}/animals`),
      animalToAdd,
    );

    await refetch();

    setAnimalToAdd(null);
  }

  async function updateAnimal(
    docRef: DocumentReference,
    updatedAnimal: Animal,
  ) {
    await updateDoc(docRef, updatedAnimal);

    await refetch();
  }

  async function deleteAnimal(docRef: DocumentReference) {
    await deleteDoc(docRef);

    await refetch();
  }
};

const EditAnimalRow: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
  saveChanges: () => unknown;
  cancelEdit?: () => unknown;
}> = ({ animal, changeAnimal, saveChanges, cancelEdit }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <Input
          value={animal?.name ?? ""}
          onChange={(e) =>
            changeAnimal((a) => ({ ...a, name: e.currentTarget.value }))
          }
        />
      </Table.Td>
      <Table.Td>
        <Input
          value={animal?.type ?? ""}
          onChange={(e) =>
            changeAnimal((a) => ({ ...a, type: e.currentTarget.value }))
          }
        />
      </Table.Td>
      <Table.Td>
        <Input
          value={animal?.subType ?? ""}
          onChange={(e) =>
            changeAnimal((a) => ({
              ...a,
              subType: e.currentTarget.value,
            }))
          }
        />
      </Table.Td>
      <Table.Td>
        <Select
          value={animal?.sex}
          data={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
          onChange={(v) =>
            changeAnimal((a) => ({
              ...a,
              sex: (v as AnimalSex) ?? undefined,
            }))
          }
        />
      </Table.Td>
      <Table.Td>
        <ActionIcon disabled={!animal?.name} onClick={saveChanges}>
          <IconDeviceFloppy />
        </ActionIcon>
        {cancelEdit && (
          <ActionIcon onClick={cancelEdit} ml="xs">
            <IconX />
          </ActionIcon>
        )}
      </Table.Td>
    </Table.Tr>
  );
};

const ExistingAnimalRow: FC<{
  animal: Animal;
  onDelete: () => unknown;
  onUpdate: (updatedAnimal: Animal) => unknown;
}> = ({ animal, onDelete, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const isEditMode = !!animalToEdit;

  if (isEditMode) {
    return (
      <EditAnimalRow
        animal={animalToEdit}
        changeAnimal={setAnimalToEdit}
        cancelEdit={() => setAnimalToEdit(null)}
        saveChanges={() => {
          onUpdate(animalToEdit);
          setAnimalToEdit(null);
        }}
      />
    );
  }

  return (
    <Table.Tr>
      <Table.Td>{animal.name}</Table.Td>
      <Table.Td>{animal.type}</Table.Td>
      <Table.Td>{animal.subType}</Table.Td>
      <Table.Td>{animal.sex}</Table.Td>
      <Table.Td>
        <ActionIcon onClick={() => setAnimalToEdit(animal)}>
          <IconPencil />
        </ActionIcon>
        <ActionIcon onClick={onDelete} ml="xs">
          <IconTrash />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  );
};
