import { FC } from "react";
import { getDocs, collection } from "firebase/firestore";
import { firestoreDb } from "./firebase.ts";
import { useQuery } from "@tanstack/react-query";
import { useAuthenticatedUser } from "./authenticatedUserContext.tsx";

export const AnimalList: FC = () => {
  const user = useAuthenticatedUser();

  const { data } = useQuery({
    queryKey: ["animals", user.uid],
    queryFn: getAnimals,
  });

  return (
    <>
      <ul>{data?.map((a) => <li key={a.id}>{a.name}</li>)}</ul>
    </>
  );

  async function getAnimals() {
    try {
      const animals = await getDocs(
        collection(firestoreDb, `users/${user?.uid}/animals`),
      );

      return animals.docs.map((doc) => {
        const data = doc.data();
        return { name: data.name, id: doc.id };
      });

      // await addDoc(collection(firestoreDb, `users/${authenticatedUser?.uid}/animals`), {
      //     type: "snake",
      //     name: "Venice"
      // });
    } catch (e) {
      console.error("Error getting animals: ", e);
    }
  }
};
