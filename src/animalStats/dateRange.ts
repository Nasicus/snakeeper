import dayjs from "dayjs";

export type DateRange = { from: Date | null; to: Date | null };

export const defaultDateRange: DateRange = {
  from: dayjs().subtract(1, "year").toDate(),
  to: null,
};
