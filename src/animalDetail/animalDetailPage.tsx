import { FC } from "react";
import { useParams } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { useAnimalSubscription } from "../animal/useAnimalSubscription.tsx";
import { AnimalDetails } from "./animalDetails.tsx";
import { AnimalReports } from "../animalReports/animalReports.tsx";

export const AnimalDetailPage: FC = () => {
  const { animalId } = useParams();

  const animal = useAnimalSubscription(animalId);

  if (!animal) {
    return <>Animal does not exist.</>;
  }

  return (
    <>
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
    </>
  );
};
