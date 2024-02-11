import { FC } from "react";
import { AuthGuard } from "./authentication/authGuard.tsx";
import classes from "./app.module.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimalDetailPage } from "./animalDetail/animalDetailPage.tsx";
import { AnimalsOverviewPage } from "./animalsOverview/animalsOverviewPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnimalsOverviewPage />,
    errorElement: <AnimalsOverviewPage />,
  },
  {
    path: "/animals/:animalId",
    element: <AnimalDetailPage />,
    errorElement: <AnimalDetailPage />,
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
