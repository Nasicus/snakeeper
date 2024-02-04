import { FC } from "react";
import { AuthGuard } from "./authGuard.tsx";
import { AnimalTable } from "./animalTable.tsx";
import classes from "./app.module.css";

export const App: FC = () => {
  return (
    <div className={classes.host}>
      <AuthGuard>
        <AnimalTable />
      </AuthGuard>
    </div>
  );
};
