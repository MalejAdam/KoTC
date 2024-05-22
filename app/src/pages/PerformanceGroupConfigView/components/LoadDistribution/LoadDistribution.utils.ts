import { ERROR_30 } from "../../../../theme/muiTheme";
import { MAX_STEPS_IN_SCENARIO } from "../../PerformanceGroupConfigView.utils";
import { ErrorMessages } from "./LoadDistribution.types";

export const lightRed = ERROR_30;

export const getErrorMessages = (maxVUs: number): ErrorMessages => {
  return {
    vuGeographyError:
      "Scripts should be allocated at least 1 VU from each of the geographies added in your scenario.",
    geoDistrLoadSumError:
      "Server location load percentages must add up to 100.",
    totalStepsError: `Remove scripts that exceed the ${MAX_STEPS_IN_SCENARIO} step limit, or edit these scripts to remove steps.`,
    totalUserError: `The total number of virtual users in your scenario exceeds the maximum allowed for your account (${maxVUs} VUs).`,
  };
};
