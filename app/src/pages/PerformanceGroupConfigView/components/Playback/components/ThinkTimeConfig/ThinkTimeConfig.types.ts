import { ValidationErrors } from "@src/pages/PerformanceGroupConfigView/PerformanceGroupConfigView.types";
import {Scenario} from "../../../../../../../../electron/src/types/scenario";

export type ThinkTimeConfigProps = {
  onChange: (key: string, value: number | string | boolean) => void;
  scenarioData: Scenario;
  errors: ValidationErrors;
  isOverrideThinkTime: boolean;
};
