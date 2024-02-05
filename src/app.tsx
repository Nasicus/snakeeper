import { FC } from "react";
import { AuthGuard } from "./authGuard.tsx";
import { AnimalTable } from "./animalTable.tsx";
import classes from "./app.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimalDetail } from "./animalDetail.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimalTable />,
    errorElement: <AnimalTable />,
  },
  {
    path: "/animals/:animalId",
    element: <AnimalDetail />,
    errorElement: <AnimalDetail />,
    
  },
]);

export const App: FC = () => {
  return (
    <div className={classes.host}>
      <AuthGuard>
        <RouterProvider router={router} />
      </AuthGuard>
    </div>
  );
};
