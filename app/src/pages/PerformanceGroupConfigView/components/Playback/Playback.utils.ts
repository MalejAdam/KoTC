import {
  RowDataType,
  ValidationErrorsTypes,
} from "../../PerformanceGroupConfigView.types";
import {
  MAX_THINK_TIME,
  MAX_TIMEOUT_DELAY,
  MIN_THINK_TIME,
  MIN_TIMEOUT_DELAY
} from "../../PerformanceGroupConfigView.utils";
import { ErrorMessages } from "./Playback.types";


export const getErrorMessage = (): ErrorMessages => ({
  [ValidationErrorsTypes.timeoutDelay]: `Event timeout must be between ${MIN_TIMEOUT_DELAY} and ${MAX_TIMEOUT_DELAY} seconds.`,
  [ValidationErrorsTypes.thinkTime]: `Think time must be between ${MIN_THINK_TIME} and ${MAX_THINK_TIME} milliseconds.`,
  [ValidationErrorsTypes.thinkTimeMode]: "Think time mode is not valid."
});

export const rowData = (): RowDataType[] => [
  {
    name: "timeoutDelay",
    label: "Event timeout (seconds):",
    errorKey: ValidationErrorsTypes.timeoutDelay,
  },
  {
    name: "thinkTime",
    label: "Think Time (milliseconds):",
    errorKey: ValidationErrorsTypes.thinkTime,
  },
  {
    name: "thinkTimeMode",
    label: "",
    errorKey: ValidationErrorsTypes.thinkTimeMode,
  },
];

export const rowDataHash = (function () {
  return rowData().reduce((acc, row) => {
    acc[row.name as ValidationErrorsTypes] = row;
    return acc;
  }, {} as Record<ValidationErrorsTypes, RowDataType>)
})();