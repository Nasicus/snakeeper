import {FC, Dispatch, SetStateAction} from "react";
import {AnimalReportEntry} from "../../animalReportEntry.ts";
import {Switch, TextInput} from "@mantine/core";

export const FeedActivityEditor: FC<{
    report: AnimalReportEntry;
    updateReport: Dispatch<SetStateAction<AnimalReportEntry | null>>;
}> = ({report, updateReport}) => {
    return (
        <>
            <Switch
                mt="xs"
                label="Did eat"
                checked={report.didEat}
                onChange={(e) =>
                    updateReport((prev) => ({
                        ...prev,
                        didEat: e.currentTarget.checked,
                    }))
                }
            />

            <TextInput
                label="Food type"
                value={report.foodType || ""}
                onChange={(e) =>
                    updateReport((prev) => ({
                        ...prev,
                        foodType: e.currentTarget.value,
                    }))
                }
            />
        </>
    );
};