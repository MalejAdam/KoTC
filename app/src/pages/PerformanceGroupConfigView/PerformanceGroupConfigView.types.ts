export enum ChangeType {
  vusPerScript = "virtualUsersPerScript",
  changeServerLocation = "serverLocationChange",
  changeServerLoad = "serverLoadChange",
  removeLocation = "removeLocation",
  addLocation = "addLocation",
}

export type ValidationErrors = {
  totalUserError: boolean;
  vuGeographyError: boolean;
  geoDistrLoadSumError: boolean;
  totalStepsError: boolean;
  rampUpStepsError: boolean;
  durationError: boolean;
  iterationsError: boolean;
  rampUpError: boolean;
  iterationDelayError: boolean;
  maxDurationIterationError: boolean;
  timeoutDelay: boolean;
  thinkTime: boolean;
  thinkTimeMode: boolean;
};

export enum ValidationErrorsTypes {
  totalUserError = "totalUserError",
  vuGeographyError = "vuGeographyError",
  geoDistrLoadSumError = "geoDistrLoadSumError",
  totalStepsError = "totalStepsError",
  rampUpStepsError = "rampUpStepsError",
  durationError = "durationError",
  iterationsError = "iterationsError",
  rampUpError = "rampUpError",
  iterationDelayError = "iterationDelayError",
  maxDurationIterationError = "maxDurationIterationError",
  timeoutDelay = "timeoutDelay",
  thinkTime = "thinkTime",
  thinkTimeMode = "thinkTimeMode",
}

export type RowDataType = {
  name: string;
  label: string;
  errorKey: ValidationErrorsTypes;
  max?: number;
  isOnlyIterationBased?: boolean;
  isOnlyDurationBased?: boolean;
  disabledAndReadOnly?: boolean;
  warningKey?: keyof ValidationWarnings;
};

export type ValidationWarnings = {
  maxDurationIteration: boolean;
};
