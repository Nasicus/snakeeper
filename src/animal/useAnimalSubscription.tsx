import { onSnapshot, doc } from "firebase/firestore";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { useState, useEffect } from "react";
import { firestoreDb } from "../firebase.ts";
import { mapAnimalDocument, AnimalDocument } from "./mapAnimalDocument.ts";

export function useAnimalSubscription(animalId?: string) {
  const user = useAuthenticatedUser();

  const [animal, setAnimal] = useState<AnimalDocument | null>(null);

  useEffect(subscribeToAnimal, [user.uid, animalId]);

  return animal;

  function subscribeToAnimal() {
    if (!animalId) {
      return;
    }

    return onSnapshot(
      doc(firestoreDb, `users/${user?.uid}/animals`, animalId),
      (doc) => {
        const animalDocument = mapAnimalDocument(doc);

        if (!animalDocument) {
          setAnimal(null);
          return;
        }

        setAnimal(animalDocument);
      },
    );
  }
}
