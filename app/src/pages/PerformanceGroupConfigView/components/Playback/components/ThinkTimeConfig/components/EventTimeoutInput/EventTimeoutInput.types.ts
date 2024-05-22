import { Scenario } from "../../../../../../../../../../electron/src/types/scenario";

export type EventTimeoutProps = {
  name: string;
  value: number | string;
  label: string;
  error: boolean;
  errorMessage: string;
  scenarioData: Scenario;
  isOverrideThinkTime: boolean;
  onChange: (key: string, value: number | string | boolean) => unknown;
};
