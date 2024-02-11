import {
  DocumentReference,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";
import { useState, useEffect } from "react";
import { firestoreDb } from "./firebase.ts";
import { Animal } from "./animal.ts";

type AnimalDocument = Animal & {
  docRef: DocumentReference;
};

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
            const data = doc.data();
            return {
              name: data.name,
              id: doc.id,
              type: data.type,
              subType: data.subType,
              sex: data.sex,
              docRef: doc.ref,
            };
          }),
        );
      },
    );
  }
}
