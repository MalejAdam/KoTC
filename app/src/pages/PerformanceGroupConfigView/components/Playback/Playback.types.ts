import {Scenario} from "../../../../../../electron/src/types/scenario";
import {
  ValidationWarnings,
  ValidationErrors,
} from "../../PerformanceGroupConfigView.types";

export type PlaybackProps = {
  onChange: (key: string, value: number | string | boolean) => void;
  scenarioData: Scenario;
  errors: ValidationErrors;
  warnings: ValidationWarnings;
};

export type ErrorMessages = {
  [key in keyof ValidationErrors]?: string;
};
