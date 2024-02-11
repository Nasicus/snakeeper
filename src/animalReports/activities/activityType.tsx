import {FC} from "react";
import {ReportTypeValues} from "../animalReportEntry.ts";

export const ActivityType: FC<{ type?: ReportTypeValues }> = ({type}) => {
    return (
        <>
            <strong>Activity:</strong> {type}
        </>
    );
};