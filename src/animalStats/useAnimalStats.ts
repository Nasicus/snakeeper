import { useMemo } from "react";
import { AnimalReportEntry } from "../animalReports/animalReportEntry.ts";
import dayjs from "dayjs";

export type AnimalStatsData = {
  currentWeight: number | null;
  weightChange: number | null;
  lastFedDate: Date | null;
  lastShedDate: Date | null;
  lastWeighedDate: Date | null;
  totalReports: number;
  avgFeedingInterval: number | null;
  avgShedCycle: number | null;
  weightOverTime: { date: string; weight: number }[];
  feedingIntervals: { date: string; days: number }[];
  shedCycles: { date: string; days: number }[];
};

export function useAnimalStats(
  reports: AnimalReportEntry[],
): AnimalStatsData {
  return useMemo(() => computeStats(reports), [reports]);
}

function computeStats(reports: AnimalReportEntry[]): AnimalStatsData {
  const dated = reports
    .filter((r) => r.date != null)
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  const weighings = dated.filter(
    (r) => r.type === "weighing" && r.weightInGrams != null,
  );
  const feedings = dated.filter(
    (r) => r.type === "feeding" && r.didEat === true,
  );
  const sheds = dated.filter(
    (r) => r.type === "shedding" && r.shedType === "success",
  );

  const weightOverTime = weighings.map((r) => ({
    date: dayjs(r.date).format("MMM D, YY"),
    weight: r.weightInGrams!,
  }));

  const currentWeight =
    weighings.length > 0
      ? weighings[weighings.length - 1].weightInGrams!
      : null;

  const weightChange =
    weighings.length >= 2
      ? weighings[weighings.length - 1].weightInGrams! -
        weighings[weighings.length - 2].weightInGrams!
      : null;

  const feedingIntervals = computeIntervals(feedings);
  const shedCycles = computeIntervals(sheds);

  const avgFeedingInterval = avg(feedingIntervals.map((f) => f.days));
  const avgShedCycle = avg(shedCycles.map((s) => s.days));

  const lastFedDate =
    feedings.length > 0 ? feedings[feedings.length - 1].date! : null;
  const lastShedDate =
    sheds.length > 0 ? sheds[sheds.length - 1].date! : null;
  const lastWeighedDate =
    weighings.length > 0 ? weighings[weighings.length - 1].date! : null;

  return {
    currentWeight,
    weightChange,
    lastFedDate,
    lastShedDate,
    lastWeighedDate,
    totalReports: reports.length,
    avgFeedingInterval,
    avgShedCycle,
    weightOverTime,
    feedingIntervals,
    shedCycles,
  };
}

function computeIntervals(
  sorted: AnimalReportEntry[],
): { date: string; days: number }[] {
  const result: { date: string; days: number }[] = [];
  for (let i = 1; i < sorted.length; i++) {
    const days = dayjs(sorted[i].date).diff(sorted[i - 1].date, "day");
    result.push({
      date: dayjs(sorted[i].date).format("MMM D, YY"),
      days,
    });
  }
  return result;
}

function avg(nums: number[]): number | null {
  if (nums.length === 0) {
    return null;
  }
  return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length);
}
