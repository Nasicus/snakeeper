import { FC } from "react";
import { AuthGuard } from "./authGuard.tsx";
import { AnimalList } from "./animalList.tsx";
import classes from "./app.module.css";

export const App: FC = () => {
  return (
    <div className={classes.host}>
      <AuthGuard>
        <AnimalList />
      </AuthGuard>
    </div>
  );
};
