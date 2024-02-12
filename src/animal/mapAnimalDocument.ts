import { Animal } from "./animal.ts";
import { DocumentReference, DocumentSnapshot } from "firebase/firestore";

export type AnimalDocument = Animal & {
  docRef: DocumentReference;
};

export function mapAnimalDocument(doc: DocumentSnapshot): AnimalDocument | null {
  const data = doc.data();
  
  if (!data) {
      return null;
  }

  return {
    name: data.name,
    id: doc.id,
    type: data.type,
    subType: data.subType,
    sex: data.sex,
    dateOfBirth: data.dateOfBirth?.toDate(),
    docRef: doc.ref,
  };
}
