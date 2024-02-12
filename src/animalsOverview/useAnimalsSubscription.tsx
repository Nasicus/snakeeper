import { onSnapshot, query, collection } from "firebase/firestore";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { useState, useEffect } from "react";
import { firestoreDb } from "../firebase.ts";
import {
  AnimalDocument,
  mapAnimalDocument,
} from "../animal/mapAnimalDocument.ts";

export function useAnimalsSubscription() {
  const user = useAuthenticatedUser();

  const [animals, setAnimals] = useState<AnimalDocument[]>([]);

  useEffect(subscribeToAnimals, [user.uid]);

  return animals;

  function subscribeToAnimals() {
    return onSnapshot(
      query(collection(firestoreDb, `users/${user?.uid}/animals`)),
      (snapshot) => {
        setAnimals(
          snapshot.docs.map((doc) => {
            return mapAnimalDocument(doc)!;
          }),
        );
      },
    );
  }
}
