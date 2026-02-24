import { FC } from "react";
import { Card, Title, Text } from "@mantine/core";
import { BarChart } from "@mantine/charts";

export const ShedTimeline: FC<{
  data: { date: string; days: number }[];
  avg: number | null;
}> = ({ data, avg }) => {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Title order={4} mb={4}>
        Shed Cycles
      </Title>
      {avg != null && (
        <Text size="sm" c="dimmed" mb="sm">
          Avg: {avg} days between sheds
        </Text>
      )}
      {data.length === 0 ? (
        <Text c="dimmed" ta="center" py="lg">
          Not enough shed data yet
        </Text>
      ) : (
        <BarChart
          h={200}
          data={data}
          dataKey="date"
          series={[{ name: "days", color: "yellow.6", label: "Days" }]}
          valueFormatter={(v) => `${v}d`}
        />
      )}
    </Card>
  );
};
