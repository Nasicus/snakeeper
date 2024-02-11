import {FC, Dispatch, SetStateAction} from "react";
import {AnimalReportEntry} from "../../animalReportEntry.ts";
import {NumberInput} from "@mantine/core";

export const WeighingActivityEditor: FC<{
    report: AnimalReportEntry;
    updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({report, updateReport}) => {
    return (
        <NumberInput
            label="Weight in grams"
            value={report.weightInGrams}
            onChange={(value) =>
                updateReport((prev) => ({
                    ...prev,
                    weightInGrams: typeof value === "number" ? value : parseFloat(value),
                }))
            }
        />
    );
};