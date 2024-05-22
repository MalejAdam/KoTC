import { ReactElement } from "react";
import { CreateScenarioBody, UpdateScenarioBody, Scenario } from "../../../../electron/src/types/scenario";
import { GeoAMI } from "@src/pages/PerformanceGroupConfigView/components/LoadDistribution/LoadDistribution.types";
import User from "@src/types/user";

export enum TestMode {
  API = "API",
  UI = "UI",
}

export type PerformanceGroupConfigProps = {
  scenario: Scenario;
  geoAMIs: GeoAMI[];
  user: User;
  testMode: TestMode;
  startTestRun: () => Promise<void>;
  saveScenarioBeforeClose: (scenario: CreateScenarioBody | UpdateScenarioBody, isEdit: boolean) => Promise<void>;
  executeTranslation: (args: { testName: string, folderPath: string, fileName: string }) => Promise<void>;
  isLoading: boolean;
};

export type PerformanceGroupConfigContextProps = {
  scenario: Scenario;
  geoAMIs: GeoAMI[];
  testMode: TestMode;
  user: User;
  maxVUs: number;
  addOn500Vus: number;
  startTestRun: () => Promise<void>;
  saveScenarioBeforeClose: (scenario: CreateScenarioBody | UpdateScenarioBody, isEdit: boolean) => Promise<void>;
  executeTranslation: (args: { testName: string, folderPath: string, fileName: string }) => Promise<void>;
  isLoading: boolean;
};

export type PerformanceGroupConfigManagerProps = PerformanceGroupConfigProps & {
  children: ReactElement;
};
