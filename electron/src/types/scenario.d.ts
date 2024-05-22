import { Script } from "./script";
import { AmiRegionLabels, AmiRegions} from './ami-regions';


export type ThinkTimeModeTypes = 'fixed' | 'recorded' | 'minimum' | 'random';

export type GeographicalDistrict = {
    subnetId: string,
    pctg: number,
    vus: number,
    securityGroups: Array<string>,
    label: AmiRegionLabels,
    region: AmiRegions,
    ami: string,
}

type ScenarioScriptBody = {
    scriptId: string;
    virtualUsers: number;
}

export interface CreateScenarioBody {
    scenarioName: string;
    dedicatedProduct: "LN" | "TC";
    durationBased: boolean;
    pauseForIPs: boolean;
    durationM: number;
    iterations: number;
    iterationDelayS: number;
    rampUpM: number;
    thinkTimeMode: string;
    thinkTimeMS: number;
    timeoutDelayS: number;
    scripts: Array<ScenarioScriptBody>;
}

export type UpdateScenarioBody = {
    name: string;
    iterationDelay: number;
    vusPerRegion: Array<number>;
    vusPerScript: Array<Array<number>>;
    geoDistr: Array<GeographicalDistrict>;
    machineType: string;
    maxDurationIteration: number;
    iterations: number;
    pauseForIPs: boolean;
    rampUpSteps: number;
    rampUp: number;
    durationBased: boolean;
    scripts?: Array<ScenarioScriptBody>;
}

export type Scenario = {
    projectId: string,
    debugMode: string,
    durationBased: boolean,
    scriptConfigs: Array<Script>,
    iterations: number,
    thinkTime: number,
    projectName: string,
    name: string,
    createDateString: string,
    scenarioId: string,
    useScriptSettings: boolean,
    duration: number,
    thinkTimeMode: ThinkTimeModeTypes,
    pauseForIPs: boolean,
    accountId: string,
    rampUpSteps: number,
    vusPerScript: Array<Array<number>>,
    runWithTunnel: boolean,
    vusPerRegion: Array<number>,
    timeoutDelay: number,
    totalUsers: number,
    iterationDelay: number,
    enableDebugTime: number,
    geoDistr: Array<GeographicalDistrict>,
    createDate: string,
    fullLoadDuration: number,
    rampUp: number,
    machineType: string,
    recommendedMachineType: boolean | string,
    backupRegionsType?: string,
    backupRegions?: Array<AmiRegions>,
    randomStartTime?: number,
    randomEndTime?: number,
    totalDuration?: number,
    maxScriptReplayTimeout?: number,
    maxDurationIteration?: number,
    minLimitDurationIteration?: number,
};

export type GetSingleScenarioArgs = {
    projectId: string;
    scenarioId: string;
}

export type PostSingleScenarioArgs = {
    projectId: string;
    data: CreateScenarioBody;
}