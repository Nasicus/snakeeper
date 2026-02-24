import { FC } from "react";
import { useParams } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { useAnimalSubscription } from "../animal/useAnimalSubscription.tsx";
import { AnimalDetails } from "./animalDetails.tsx";
import { AnimalReports } from "../animalReports/animalReports.tsx";
import { Center, Loader, Stack, Text } from "@mantine/core";

export const AnimalDetailPage: FC = () => {
  const { animalId } = useParams();

  const { animal, isLoading } = useAnimalSubscription(animalId);

  if (isLoading) {
    return (
      <Center py="xl">
        <Loader color="snake" />
      </Center>
    );
  }

  if (!animal) {
    return <Text c="dimmed">Animal does not exist.</Text>;
  }

  return (
    <Stack gap="lg">
      <AnimalDetails
        animal={animal}
        onUpdate={(u) => updateDoc(animal.docRef, u)}
      />
      <AnimalReports
        animalId={animalId}
        updateAnimalFields={(u) =>
          updateDoc(animal.docRef, { ...animal, ...u })
        }
      />
    </Stack>
  );
};
