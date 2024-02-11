import {FC, Dispatch, SetStateAction} from "react";
import {
    AnimalReportEntry,
    ShedType,
    ShedTypeValues,
} from "../../animalReportEntry.ts";
import {Select} from "@mantine/core";

export const SheddingActivityEditor: FC<{
    report: AnimalReportEntry;
    updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({report, updateReport}) => {
    return (
        <Select
            label="Shed type"
            value={report.shedType}
            data={Object.values(ShedType)}
            onChange={(v) =>
                updateReport((prev) => ({
                    ...prev,
                    shedType: (v as ShedTypeValues) || "started",
                }))
            }
        />
    );
};