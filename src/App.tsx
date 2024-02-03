import { FC } from "react";
import { AuthGuard } from "./authGuard.tsx";
import { AnimalList } from "./animalList.tsx";

export const App: FC = () => {
  return (
    <AuthGuard>
      <AnimalList />
    </AuthGuard>
  );
};
