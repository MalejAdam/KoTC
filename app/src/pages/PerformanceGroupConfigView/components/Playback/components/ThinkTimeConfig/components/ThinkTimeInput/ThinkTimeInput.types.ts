import { ValidationErrors } from "@src/pages/PerformanceGroupConfigView/PerformanceGroupConfigView.types";
import {Scenario} from "../../../../../../../../../../electron/src/types/scenario";

export type ThinkTimeInputProps = {
  onChange: (key: string, value: number | string | boolean) => void;
  scenarioData: Scenario;
  isOverrideThinkTime: boolean;
  errors: ValidationErrors
  warning?: boolean;
  warningMessage?: string;
  max?: number;
  disabledAndReadOnly?: boolean;
};

export type ThinkTimeOptions = {
  type: string;
  display: string;
};
