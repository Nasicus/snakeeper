﻿import { FC, Dispatch, SetStateAction } from "react";
import {
  AnimalReportEntry,
  ReportType,
  ReportTypeValues,
} from "./animalReportEntry.ts";
import { Modal, Select, Textarea, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { FeedActivityEditor } from "./activities/editors/feedActivityEditor.tsx";
import { SheddingActivityEditor } from "./activities/editors/sheddingActivityEditor.tsx";
import { WeighingActivityEditor } from "./activities/editors/weighingActivityEditor.tsx";

export const AddReport: FC<{
  report: AnimalReportEntry | null;
  updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
  onSave: () => unknown;
  onCancel: () => unknown;
}> = ({ report, updateReport, onSave, onCancel }) => {
  return (
    <Modal
      opened={!!report}
      withCloseButton
      onClose={onCancel}
      title="Add report"
    >
      <DatePickerInput
        label="When"
        value={report?.date}
        onChange={(v) =>
          updateReport((prev) => ({
            ...prev,
            date: v || new Date(),
          }))
        }
      />
      <Select
        label="What"
        value={report?.type}
        data={Object.values(ReportType)}
        onChange={(v) =>
          updateReport((prev) => ({
            ...prev,
            shedType: undefined,
            weightInGrams: undefined,
            didEat: undefined,
            foodType: undefined,
            type: (v as ReportTypeValues) || "misc",
          }))
        }
      />
      {report?.type === "feeding" && (
        <FeedActivityEditor report={report} updateReport={updateReport} />
      )}

      {report?.type === "shedding" && (
        <SheddingActivityEditor report={report} updateReport={updateReport} />
      )}

      {report?.type === "weighing" && (
        <WeighingActivityEditor report={report} updateReport={updateReport} />
      )}

      <Textarea
        label="Notes"
        value={report?.notes || ""}
        onChange={(e) =>
          updateReport((prev) => ({
            ...prev,
            notes: e.currentTarget.value,
          }))
        }
      />

      <Button
        mt="xs"
        leftSection={<IconDeviceFloppy size={14} />}
        onClick={onSave}
      >
        Save
      </Button>
    </Modal>
  );
};
