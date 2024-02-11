import {
  DocumentReference,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import { useAuthenticatedUser } from "../authentication/authenticatedUserContext.tsx";
import { useState, useEffect } from "react";
import { firestoreDb } from "../firebase.ts";
import { AnimalReportEntry } from "./animalReportEntry.ts";

export type AnimalReportEntryDocument = AnimalReportEntry & {
  docRef: DocumentReference;
};

export function useAnimalReportSubscription(animalId?: string) {
  const user = useAuthenticatedUser();

  const [reports, setReports] = useState<AnimalReportEntryDocument[]>([]);

  useEffect(subscribeToReports, [user.uid, animalId]);

  return reports;

  function subscribeToReports() {
    if (!animalId) {
      return;
    }

    return onSnapshot(
      query(
        collection(
          firestoreDb,
          `users/${user?.uid}/animals/${animalId}/reports`,
        ),
      ),
      (snapshot) => {
        setReports(
          snapshot.docs.map((doc) => {
            const data = doc.data();
            const report: AnimalReportEntryDocument = {
              type: data.type || "misc",
              date: data.date?.toDate() || new Date(),
              didEat: data.didEat,
              foodType: data.foodType,
              notes: data.notes,
              shedType: data.shedType,
              weightInGrams: data.weightInGrams,
              id: doc.id,
              docRef: doc.ref,
            };

            return report;
          }),
        );
      },
    );
  }
}
