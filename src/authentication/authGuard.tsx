import { FC, PropsWithChildren } from "react";
import { useFireBaseAuthentication } from "./useFireBaseAuthentication.ts";
import { AuthenticatedUserContext } from "./authenticatedUserContext.tsx";
import { Center, Card, Stack, Text, Button, Loader } from "@mantine/core";
import { SnakeLogo } from "../components/SnakeLogo.tsx";

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isAuthLoading,
    authenticatedUser,
    triggerLoginFlow,
  } = useFireBaseAuthentication();

  if (isAuthLoading) {
    return (
      <Center h="100vh">
        <Loader color="snake" size="lg" />
      </Center>
    );
  }

  if (!authenticatedUser) {
    return (
      <Center h="100vh" bg="#f7faf7">
        <Card shadow="md" padding="xl" radius="md" withBorder w={360}>
          <Stack align="center" gap="md">
            <Text c="snake.6" display="flex">
              <SnakeLogo size={64} />
            </Text>
            <Text fw={700} size="xl" c="snake.6">
              snakeeper
            </Text>
            <Text size="sm" c="dimmed" ta="center">
              Track your reptiles, feedings, and sheds
            </Text>
            <Button fullWidth onClick={triggerLoginFlow}>
              Sign in
            </Button>
          </Stack>
        </Card>
      </Center>
    );
  }

  return (
    <AuthenticatedUserContext.Provider value={authenticatedUser}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
