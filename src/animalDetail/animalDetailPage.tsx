import { FC } from "react";
import { useParams } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { useAnimalSubscription } from "../animal/useAnimalSubscription.tsx";
import { AnimalDetails } from "./animalDetails.tsx";
import { AnimalReports } from "../animalReports/animalReports.tsx";
import { AnimalStats } from "../animalStats/animalStats.tsx";
import { useAnimalReportSubscription } from "../animalReports/useAnimalReportSubscription.tsx";
import { Center, Loader, Stack, Tabs, Text } from "@mantine/core";
import { IconList, IconChartLine } from "@tabler/icons-react";

export const AnimalDetailPage: FC = () => {
  const { animalId } = useParams();

  const { animal, isLoading: isAnimalLoading } = useAnimalSubscription(animalId);
  const { reports, isLoading: isReportsLoading } = useAnimalReportSubscription(animalId);

  if (isAnimalLoading || isReportsLoading) {
    return (
      <Center py="xl">
        <Loader color="snake" />
      </Center>
    );
  }

  if (!animal) {
    return <Text c="dimmed">Animal does not exist.</Text>;
  }

  return (
    <Stack gap="lg">
      <AnimalDetails
        animal={animal}
        onUpdate={(u) => updateDoc(animal.docRef, u)}
      />
      <Tabs defaultValue="reports" keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="reports" leftSection={<IconList size={16} />}>
            Reports
          </Tabs.Tab>
          <Tabs.Tab value="stats" leftSection={<IconChartLine size={16} />}>
            Stats
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="reports" pt="md">
          <AnimalReports
            animalId={animalId}
            reports={reports}
            updateAnimalFields={(u) =>
              updateDoc(animal.docRef, { ...animal, ...u })
            }
          />
        </Tabs.Panel>
        <Tabs.Panel value="stats" pt="md">
          <AnimalStats reports={reports} />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
