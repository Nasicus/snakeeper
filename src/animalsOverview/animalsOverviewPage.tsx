import { FC, useState } from "react";
import { collection, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { firestoreDb } from "../firebase.ts";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { Table, Title } from "@mantine/core";
import { useAnimalsSubscription } from "./useAnimalsSubscription.tsx";
import { Animal } from "../animal/animal.ts";
import { EditableAnimalRow } from "./editableAnimalRow.tsx";
import { ReadOnlyAnimalRow } from "./readOnlyAnimalRow.tsx";

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

