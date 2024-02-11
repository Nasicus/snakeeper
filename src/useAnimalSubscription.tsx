import { DocumentReference, onSnapshot, doc } from "firebase/firestore";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";
import { useState, useEffect } from "react";
import { firestoreDb } from "./firebase.ts";
import { Animal } from "./animal.ts";

type AnimalDocument = Animal & {
  docRef: DocumentReference;
};

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
        const data = doc.data();

        if (!data) {
          setAnimal(null);
          return;
        }

        setAnimal({
          name: data.name,
          id: doc.id,
          type: data.type,
          subType: data.subType,
          sex: data.sex,
          dateOfBirth: data.dateOfBirth?.toDate(),
          docRef: doc.ref,
        });
      },
    );
  }
}
