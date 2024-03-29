﻿export type AnimalReportEntry = {
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
  Born: "born",
  Died: "died",
} as const;

type ReportTypeKeys = keyof typeof ReportType;

export type ReportTypeValues = (typeof ReportType)[ReportTypeKeys];

export const ShedType = {
  ProbablyStarted: "started_probably",
  Started: "started",
  Partial: "partial",
  Success: "success",
  Failed: "failed",
} as const;

type ShedTypeKeys = keyof typeof ShedType;

export type ShedTypeValues = (typeof ShedType)[ShedTypeKeys];

export const shedTypeExpectedOrder = {
  [ShedType.ProbablyStarted]: ShedType.Success,
  [ShedType.Started]: ShedType.Success,
  [ShedType.Partial]: ShedType.Success,
  [ShedType.Success]: ShedType.Success,
  [ShedType.Failed]: ShedType.Success,
};
