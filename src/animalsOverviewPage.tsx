import { FC, useState, Dispatch, SetStateAction } from "react";
import { collection, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "./firebase.ts";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";
import { Table, ActionIcon, Title } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconTrash,
  IconPencil,
  IconX,
} from "@tabler/icons-react";
import { useAnimalsSubscription } from "./useAnimalsSubscription.tsx";
import { Animal } from "./animal.ts";
import { Link } from "react-router-dom";
import { AnimalNameEditor } from "./AnimalNameEditor.tsx";
import { AnimalTypeEditor } from "./AnimalTypeEditor.tsx";
import { AnimalSubTypeEditor } from "./AnimalSubTypeEditor.tsx";
import { AnimalSexEditor } from "./AnimalSexEditor.tsx";

export const AnimalsOverviewPage: FC = () => {
  const user = useAuthenticatedUser();

  const animals = useAnimalsSubscription();

  const [animalToAdd, setAnimalToAdd] = useState<Animal | null>(null);

  return (
    <>
      <Title order={2}>Animals</Title>
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
          {animals?.map((a) => (
            <ReadOnlyAnimalRow
              key={a.id}
              animal={a}
              onDelete={() => deleteDoc(a.docRef)}
              onUpdate={(u) => updateDoc(a.docRef, u)}
            />
          ))}
          <EditableAnimalRow
            animal={animalToAdd}
            changeAnimal={setAnimalToAdd}
            saveChanges={addAnimal}
          />
        </Table.Tbody>
      </Table>
    </>
  );

  async function addAnimal() {
    await addDoc(
      collection(firestoreDb, `users/${user.uid}/animals`),
      animalToAdd,
    );

    setAnimalToAdd(null);
  }
};

const EditableAnimalRow: FC<{
  animal: Animal | null;
  changeAnimal: Dispatch<SetStateAction<Animal | null>>;
  saveChanges: () => unknown;
  cancelEdit?: () => unknown;
}> = ({ animal, changeAnimal, saveChanges, cancelEdit }) => {
  return (
    <Table.Tr>
      <Table.Td>
        <AnimalNameEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalTypeEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalSubTypeEditor animal={animal} changeAnimal={changeAnimal} />
      </Table.Td>
      <Table.Td>
        <AnimalSexEditor animal={animal} changeAnimal={changeAnimal} />
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

const ReadOnlyAnimalRow: FC<{
  animal: Animal;
  onDelete: () => unknown;
  onUpdate: (updatedAnimal: Animal) => unknown;
}> = ({ animal, onDelete, onUpdate }) => {
  const [animalToEdit, setAnimalToEdit] = useState<Animal | null>(null);
  const isEditMode = !!animalToEdit;

  if (isEditMode) {
    return (
      <EditableAnimalRow
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
      <Table.Td>
        <Link to={`animals/${animal.id}`}>{animal.name}</Link>
      </Table.Td>
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
