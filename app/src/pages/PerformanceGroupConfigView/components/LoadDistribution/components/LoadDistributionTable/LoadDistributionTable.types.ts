import { GeographicalDistrict } from "../../../../../../../../electron/src/types/scenario";
import { ChangeType } from "../../../../PerformanceGroupConfigView.types";

export type LoadDistributionTableProps = {
    geoDistr: GeographicalDistrict[],
    vusPerRegion: number[],
    onChage: (changeType: ChangeType, itemIdx?: number, value?: any) => void,
    isError: boolean,
    errorMessage: string,
}
