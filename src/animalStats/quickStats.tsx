import { FC } from "react";
import { SimpleGrid, Card, Text } from "@mantine/core";
import { AnimalStatsData } from "./useAnimalStats.ts";
import dayjs from "dayjs";

export const QuickStats: FC<{ stats: AnimalStatsData }> = ({ stats }) => {
  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="sm">
      <StatCard label="Current Weight" value={formatWeight(stats.currentWeight)} />
      <StatCard
        label="Weight Change"
        value={formatChange(stats.weightChange)}
        color={
          stats.weightChange != null
            ? stats.weightChange >= 0
              ? "green"
              : "red"
            : undefined
        }
      />
      <StatCard label="Last Fed" value={formatDaysAgo(stats.lastFedDate)} />
      <StatCard label="Last Shed" value={formatDaysAgo(stats.lastShedDate)} />
      <StatCard
        label="Last Weighed"
        value={formatDaysAgo(stats.lastWeighedDate)}
      />
      <StatCard label="Total Reports" value={String(stats.totalReports)} />
    </SimpleGrid>
  );
};

const StatCard: FC<{ label: string; value: string; color?: string }> = ({
  label,
  value,
  color,
}) => (
  <Card shadow="sm" padding="sm" withBorder>
    <Text size="xs" c="dimmed">
      {label}
    </Text>
    <Text fw={600} size="lg" c={color}>
      {value}
    </Text>
  </Card>
);

function formatWeight(w: number | null): string {
  return w != null ? `${w}g` : "-";
}

function formatChange(c: number | null): string {
  if (c == null) {
    return "-";
  }
  return c >= 0 ? `+${c}g` : `${c}g`;
}

function formatDaysAgo(d: Date | null): string {
  if (!d) {
    return "-";
  }
  const days = dayjs().diff(d, "day");
  if (days === 0) {
    return "today";
  }
  if (days === 1) {
    return "1 day ago";
  }
  return `${days}d ago`;
}
