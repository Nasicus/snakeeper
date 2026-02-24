import { FC } from "react";
import { Stack, SimpleGrid } from "@mantine/core";
import { AnimalReportEntry } from "../animalReports/animalReportEntry.ts";
import { useAnimalStats } from "./useAnimalStats.ts";
import { QuickStats } from "./quickStats.tsx";
import { WeightChart } from "./weightChart.tsx";
import { FeedingTimeline } from "./feedingTimeline.tsx";
import { ShedTimeline } from "./shedTimeline.tsx";

export const AnimalStats: FC<{ reports: AnimalReportEntry[] }> = ({
  reports,
}) => {
  const stats = useAnimalStats(reports);

  if (reports.length === 0) {
    return null;
  }

  return (
    <Stack gap="lg">
      <QuickStats stats={stats} />
      <WeightChart data={stats.weightOverTime} />
      <SimpleGrid cols={{ base: 1, sm: 2 }}>
        <FeedingTimeline
          data={stats.feedingIntervals}
          avg={stats.avgFeedingInterval}
        />
        <ShedTimeline data={stats.shedCycles} avg={stats.avgShedCycle} />
      </SimpleGrid>
    </Stack>
  );
};
