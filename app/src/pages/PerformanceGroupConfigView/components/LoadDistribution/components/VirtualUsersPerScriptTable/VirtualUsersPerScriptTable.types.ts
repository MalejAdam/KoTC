import { ChangeType } from "../../../../PerformanceGroupConfigView.types";
import { GeographicalDistrict } from "../../../../../../../../electron/src/types/scenario";
import Script from "@src/types/script";

export type VirtualUsersPerScriptTableProps = {
    scripts: Script[],
    geoDistr: GeographicalDistrict[],
    vusPerScript: number[][],  
    onChange: (changeType: ChangeType, itemIdx?: number, value?: any) => void,  
}

export enum TableColumns {
    script = 'name',
    steps = 'stepNames',
    vus = 'virtualUsers',
    load = 'load',
    databanks = 'mappedDatabanks',
    geography = 'geoDistr'

}


