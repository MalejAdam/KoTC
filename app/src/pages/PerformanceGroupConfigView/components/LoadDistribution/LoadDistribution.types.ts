import { AmiRegionLabels, AmiRegions } from "../../../../types/ami-regions"
import { Scenario } from "../../../../../../electron/src/types/scenario"
import { ChangeType, ValidationErrors } from "../../PerformanceGroupConfigView.types"

export type LoadDistributionProps = {
    onChange: (changeType: ChangeType, itemIdx?: number, value?: any) => void,
    scenario: Scenario,
    errors: ValidationErrors,
}

export type GeoAMI = {
    region: AmiRegions,
    subnetId: string,
    ami: string,
    securityGroups: string[],
    label: AmiRegionLabels,
    pctg?: number
}

export type ErrorMessages = {
    vuGeographyError: string;
    geoDistrLoadSumError: string;
    totalStepsError: string;
    totalUserError: string;
}
