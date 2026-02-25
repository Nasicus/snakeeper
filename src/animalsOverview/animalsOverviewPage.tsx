import { FC, useState } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  DocumentReference,
} from "firebase/firestore";
import { firestoreDb } from "../firebase.ts";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { Title, SimpleGrid, Group, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useAnimalsSubscription } from "./useAnimalsSubscription.tsx";
import { Animal } from "../animal/animal.ts";
import { AnimalCard } from "./AnimalCard.tsx";
import { AnimalFormModal } from "./AnimalFormModal.tsx";
import { DeleteAnimalModal } from "./DeleteAnimalModal.tsx";

export const AnimalsOverviewPage: FC = () => {
  const user = useAuthenticatedUser();
  const animals = useAnimalsSubscription();

  const [animalToAdd, setAnimalToAdd] = useState<Animal | null>(null);
  const [animalToEdit, setAnimalToEdit] = useState<{
    animal: Animal;
    docRef: DocumentReference;
  } | null>(null);
  const [animalToDelete, setAnimalToDelete] = useState<{
    name: string;
    docRef: DocumentReference;
  } | null>(null);

  return (
    <>
      <Group justify="space-between" mb="md">
        <Title order={2}>My Animals</Title>
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={() => setAnimalToAdd({})}
        >
          Add Animal
        </Button>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {animals?.map((a) => (
          <AnimalCard
            key={a.id}
            animal={a}
            onEdit={() => setAnimalToEdit({ animal: a, docRef: a.docRef })}
            onDelete={() =>
              setAnimalToDelete({
                name: a.name ?? "this animal",
                docRef: a.docRef,
              })
            }
          />
        ))}
      </SimpleGrid>

      <AnimalFormModal
        animal={animalToAdd}
        changeAnimal={setAnimalToAdd}
        onSave={addAnimal}
        onCancel={() => setAnimalToAdd(null)}
      />

      <DeleteAnimalModal
        animal={animalToDelete}
        onClose={() => setAnimalToDelete(null)}
      />

      <AnimalFormModal
        animal={animalToEdit?.animal ?? null}
        changeAnimal={(updater) => {
          setAnimalToEdit((prev) => {
            if (!prev) {
              return null;
            }
            const next =
              typeof updater === "function" ? updater(prev.animal) : updater;
            if (!next) {
              return null;
            }
            return { ...prev, animal: next };
          });
        }}
        onSave={() => {
          if (animalToEdit) {
            updateDoc(animalToEdit.docRef, animalToEdit.animal);
            setAnimalToEdit(null);
          }
        }}
        onCancel={() => setAnimalToEdit(null)}
        title="Edit Animal"
      />
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
