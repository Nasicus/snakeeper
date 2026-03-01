import { FC, useMemo, useState } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import { AnimalReportEntry } from "../animalReports/animalReportEntry.ts";
import { useAnimalStats } from "./useAnimalStats.ts";
import { QuickStats } from "./quickStats.tsx";
import { WeightChart } from "./weightChart.tsx";
import { FeedingTimeline } from "./feedingTimeline.tsx";
import { ShedTimeline } from "./shedTimeline.tsx";
import { DateRange, defaultDateRange } from "./dateRange.ts";
import { DateRangeSelector } from "./dateRangeSelector.tsx";

export const AnimalStats: FC<{ reports: AnimalReportEntry[] }> = ({
  reports,
}) => {
  const [range, setRange] = useState<DateRange>(defaultDateRange);

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (!r.date) {
        return false;
      }
      if (range.from && r.date < range.from) {
        return false;
      }
      if (range.to && r.date > range.to) {
        return false;
      }
      return true;
    });
  }, [reports, range]);

  const stats = useAnimalStats(filtered);

  if (reports.length === 0) {
    return null;
  }

  return (
    <Stack gap="lg">
      <DateRangeSelector onChange={setRange} />
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
