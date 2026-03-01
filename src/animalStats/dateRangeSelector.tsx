import { FC, useState } from "react";
import { Group, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { DateRange } from "./dateRange.ts";

type RangePreset = "all" | "1y" | "6m" | "3m" | "1m" | "custom";

const rangeOptions = [
  { value: "all", label: "All time" },
  { value: "1y", label: "Last year" },
  { value: "6m", label: "Last 6 months" },
  { value: "3m", label: "Last 3 months" },
  { value: "1m", label: "Last month" },
  { value: "custom", label: "Custom range" },
];


export const DateRangeSelector: FC<{
  onChange: (range: DateRange) => void;
}> = ({ onChange }) => {
  const [preset, setPreset] = useState<RangePreset>("1y");
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const handlePresetChange = (v: string | null) => {
    const p = (v as RangePreset) ?? "1y";
    setPreset(p);
    if (p !== "custom") {
      onChange({ from: getStartDate(p), to: null });
    }
  };

  const handleFromChange = (d: string | null) => {
    setFrom(d);
    onChange({
      from: d ? dayjs(d).startOf("day").toDate() : null,
      to: to ? dayjs(to).endOf("day").toDate() : null,
    });
  };

  const handleToChange = (d: string | null) => {
    setTo(d);
    onChange({
      from: from ? dayjs(from).startOf("day").toDate() : null,
      to: d ? dayjs(d).endOf("day").toDate() : null,
    });
  };

  return (
    <Group>
      <Select
        data={rangeOptions}
        value={preset}
        onChange={handlePresetChange}
        w={180}
      />
      {preset === "custom" && (
        <>
          <DateInput
            placeholder="From"
            value={from}
            onChange={handleFromChange}
            clearable
          />
          <DateInput
            placeholder="To"
            value={to}
            onChange={handleToChange}
            clearable
          />
        </>
      )}
    </Group>
  );
};

function getStartDate(preset: RangePreset): Date | null {
  const now = dayjs();
  switch (preset) {
    case "all":
      return null;
    case "1y":
      return now.subtract(1, "year").toDate();
    case "6m":
      return now.subtract(6, "month").toDate();
    case "3m":
      return now.subtract(3, "month").toDate();
    case "1m":
      return now.subtract(1, "month").toDate();
    default:
      return now.subtract(1, "year").toDate();
  }
}