export type AnimalReportEntry = {
  id?: string;
  date?: Date;
  type?: ReportTypeValues;
  notes?: string;
  weightInGrams?: number;
  foodType?: string;
  didEat?: boolean;
  shedType?: ShedTypeValues;
};

export const ReportType = {
  Feeding: "feeding",
  Shedding: "shedding",
  Weighing: "weighing",
  Misc: "misc",
} as const;

type ReportTypeKeys = keyof typeof ReportType;

export type ReportTypeValues = (typeof ReportType)[ReportTypeKeys];

export const ShedType = {
  Started: "started",
  Partial: "partial",
  Success: "success",
  Failed: "failed",
} as const;

type ShedTypeKeys = keyof typeof ShedType;

export type ShedTypeValues = (typeof ShedType)[ShedTypeKeys];

export const shedTypeExpectedOrder = {
  [ShedType.Started]: ShedType.Success,
  [ShedType.Partial]: ShedType.Started,
  [ShedType.Success]: ShedType.Started,
  [ShedType.Failed]: ShedType.Started,
};
