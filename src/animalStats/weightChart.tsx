import { FC } from "react";
import { Card, Title, Text } from "@mantine/core";
import { LineChart } from "@mantine/charts";

export const WeightChart: FC<{
  data: { date: string; weight: number }[];
}> = ({ data }) => {
  return (
    <Card shadow="sm" padding="lg" withBorder>
      <Title order={4} mb="sm">
        Weight Over Time
      </Title>
      {data.length < 2 ? (
        <Text c="dimmed" ta="center" py="lg">
          Not enough weight data yet
        </Text>
      ) : (
        <LineChart
          h={300}
          data={data}
          dataKey="date"
          series={[{ name: "weight", color: "snake.6", label: "Weight (g)" }]}
          curveType="monotone"
          valueFormatter={(v) => `${v}g`}
          withLegend={false}
        />
      )}
    </Card>
  );
};
