import { FC } from "react";
import { AuthGuard } from "./authentication/authGuard.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AnimalDetailPage } from "./animalDetail/animalDetailPage.tsx";
import { AnimalsOverviewPage } from "./animalsOverview/animalsOverviewPage.tsx";
import { AppShell, Container, Group, Text } from "@mantine/core";
import { SnakeLogo } from "./components/SnakeLogo.tsx";

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
    <AuthGuard>
      <AppShell header={{ height: 56 }}>
        <AppShell.Header
          style={{ borderBottom: "2px solid var(--mantine-color-snake-3)" }}
        >
          <Group h="100%" px="md">
            <Text c="snake.6" display="flex">
              <SnakeLogo size={32} />
            </Text>
            <Text fw={700} size="lg" c="snake.6">
              snakeeper
            </Text>
          </Group>
        </AppShell.Header>
        <AppShell.Main bg="#f7faf7">
          <Container size="lg" py="md">
            <RouterProvider router={router} />
          </Container>
        </AppShell.Main>
      </AppShell>
    </AuthGuard>
  );
};
