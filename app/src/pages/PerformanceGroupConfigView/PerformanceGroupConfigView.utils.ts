import { CreateScenarioBody, GeographicalDistrict, UpdateScenarioBody, Scenario } from "../../../../electron/src/types/scenario";
import Script from "../../types/script";
import { GeoAMI } from "./components/LoadDistribution/LoadDistribution.types";
import {
  ValidationWarnings,
  ValidationErrors,
} from "./PerformanceGroupConfigView.types";

export const MAX_STEPS_IN_SCENARIO = 60;
export const MAX_RAMP_UP_STEPS = 600;
export const MAX_ITERATIONS = 500;
export const MAX_TIME_BETWEEN_ITERATIONS_S = 120;
export const MAX_DURATION_ITERATION = 360;
export const SEC_MARGIN_DURATION_FOR_ITERATION = 1.05;
export const DEFAULT_MAX_SCRIPT_REPLAY_TIMEOUT = 20;
export const DEFAULT_RAMP_UP = 2;
export const DEFAULT_RAMP_UP_STEPS = 1;
export const DEFAULT_TOTAL_USERS = 10;
export const DEFAULT_FULL_LOAD_DURATION = 5;
export const DEFAULT_ITERATION = 1;
export const MIN_TIMEOUT_DELAY = 30;
export const MAX_TIMEOUT_DELAY = 10000;
export const MIN_THINK_TIME = 100;
export const MAX_THINK_TIME = 10000;
export const DEDICATED_PRODUCT = "TC";
export const DEFAULT_MAX_DURATION_ITERATION = Math.ceil(
  DEFAULT_RAMP_UP + DEFAULT_ITERATION * DEFAULT_MAX_SCRIPT_REPLAY_TIMEOUT
);
export const MIN_DURATION_ITERATION = 1;


export const thinkTimeModeOptions = [
  {
    type: 'recorded',
    display: 'Recorded',
  },
  {
    type: 'minimum',
    display: 'Minimum',
    value: MIN_THINK_TIME,
  },
  {
    type: 'fixed',
    display: 'Custom',
    value: MIN_THINK_TIME,
  },
];

export const spinnerInfo = {
  savingScenario: "Saving scenario",
  updatingScenario: "Updating scenario",
  loadingData: "Loading data...",
};

export const recalculateVUsPerScript = (
  newGeoDistr: GeographicalDistrict[],
  scriptConfigs: Script[]
): number[][] => {
  const locationSums = newGeoDistr.map(() => 0);
  const scriptSums = scriptConfigs.map(() => 0);
  const newVuesPerScript = scriptConfigs.map((config, scriptIdx) => {
    return newGeoDistr.map((geo, geoIdx) => {
      const virtualUsers = Math.floor(geo.vus * (config.load / 100));
      scriptSums[scriptIdx] += virtualUsers;
      locationSums[geoIdx] += virtualUsers;
      return virtualUsers;
    });
  });
  scriptConfigs.map((config, scriptIdx) => {
    return newGeoDistr.map((geo, geoIdx) => {
      const notAssignedUsersInScript =
        config.virtualUsers - scriptSums[scriptIdx];
      const notAssignedUsersInLocation = geo.vus - locationSums[geoIdx];
      if (notAssignedUsersInLocation > 0 && notAssignedUsersInScript > 0) {
        const addition =
          notAssignedUsersInLocation < notAssignedUsersInScript
            ? notAssignedUsersInLocation
            : notAssignedUsersInScript;
        newVuesPerScript[scriptIdx][geoIdx] += addition;
        scriptSums[scriptIdx] += addition;
        locationSums[geoIdx] += addition;
      }
    });
  });
  return newVuesPerScript;
};

export const recalculateGeoDistr = (
  geoDistr: GeographicalDistrict[],
  totalUsers: number
): GeographicalDistrict[] => {
  return geoDistr.map((geo, idx) => {
    const pctg =
      Math.floor(100 / geoDistr.length) + Number(idx < 100 % geoDistr.length);
    const vus =
      Math.floor(totalUsers / geoDistr.length) +
      Number(idx < totalUsers % geoDistr.length);
    return { ...geo, pctg, vus };
  });
};

export const recalculateScriptLoad = (
  scriptConfigs: Script[],
  newTotalUsers: number,
  itemIdx: number,
  value: number
): Script[] => {
  const newScriptConfig = scriptConfigs.map((config, idx) => {
    if (idx !== itemIdx)
      return {
        ...config,
        load: Math.floor((config.virtualUsers * 100) / newTotalUsers),
      };
    return {
      ...config,
      virtualUsers: value,
      load: Math.floor((value * 100) / newTotalUsers),
    };
  });
  const remainder =
    100 -
    newScriptConfig
      .map((config) => config.load)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  if (remainder > 0) {
    return newScriptConfig.map((config, idx) => {
      return {
        ...config,
        load:
          config.load +
          Math.floor(remainder / 100) +
          Number(idx < remainder % 100),
      };
    });
  }
  return newScriptConfig;
};

export const recalculateGeoLoad = (
  geoDistr: GeographicalDistrict[],
  totalUsers: number,
  itemIdx: number,
  value: number
): GeographicalDistrict[] => {
  const newGeoLoad = geoDistr.map((geo, idx) => {
    if (idx !== itemIdx)
      return { ...geo, vus: Math.floor(geo.pctg / totalUsers) };
    return {
      ...geo,
      pctg: value,
      vus: Math.floor(value / totalUsers),
    };
  });

  const remainder =
    totalUsers -
    newGeoLoad
      .map((geo) => geo.vus)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  if (remainder > 0) {
    return newGeoLoad.map((geo, idx) => {
      return {
        ...geo,
        vus:
          geo.vus +
          Math.floor(remainder / totalUsers) +
          Number(idx < remainder % totalUsers),
      };
    });
  }
  return newGeoLoad;
};

export const addLocation = (
  geoAMIs: GeoAMI[],
  geoDistr: GeographicalDistrict[],
  prevScenario: Scenario
) => {
  const ami = geoAMIs.find((geo) => {
    return geoDistr.every((item) => item.label !== geo.label);
  });
  if (ami) geoDistr.push({ ...ami, pctg: 100, vus: 0 });
  const newGeoDistr: GeographicalDistrict[] = recalculateGeoDistr(
    geoDistr,
    prevScenario.totalUsers
  );
  return {
    ...prevScenario,
    vusPerScript: recalculateVUsPerScript(
      newGeoDistr,
      prevScenario.scriptConfigs
    ),
    vusPerRegion: newGeoDistr.map((geo) => geo.vus),
    geoDistr: newGeoDistr,
  };
};

export const removeLocation = (
  geoDistr: GeographicalDistrict[],
  prevScenario: Scenario,
  itemIdx?: number
) => {
  const newGeoDistr = recalculateGeoDistr(
    geoDistr.filter((_, idx) => idx !== itemIdx),
    prevScenario.totalUsers
  );
  return {
    ...prevScenario,
    vusPerScript: recalculateVUsPerScript(
      newGeoDistr,
      prevScenario.scriptConfigs
    ),
    vusPerRegion: newGeoDistr.map((geo) => geo.vus),
    geoDistr: newGeoDistr,
  };
};

export const changeVUsPerScript = (
  geoDistr: GeographicalDistrict[],
  prevScenario: Scenario,
  value: number,
  itemIdx?: number
) => {
  let newTotalUsers = 0;
  prevScenario.scriptConfigs.forEach(
    (script, idx) =>
      (newTotalUsers += idx === itemIdx ? value : script.virtualUsers)
  );
  const newScriptConfigs = recalculateScriptLoad(
    prevScenario.scriptConfigs,
    newTotalUsers,
    itemIdx || 0,
    value
  );
  return {
    ...prevScenario,
    totalUsers: newTotalUsers,
    scriptConfigs: newScriptConfigs,
    vusPerScript: recalculateVUsPerScript(geoDistr, newScriptConfigs),
  };
};

export const changeGeoLoad = (
  geoDistr: GeographicalDistrict[],
  prevScenario: Scenario,
  value: number,
  itemIdx?: number
) => {
  const newGeoDistr = recalculateGeoLoad(
    geoDistr,
    prevScenario.totalUsers,
    itemIdx || 0,
    Number(value)
  );
  return {
    ...prevScenario,
    geoDistr: newGeoDistr,
    vusPerRegion: newGeoDistr.map((geo) => geo.vus),
    vusPerScript: recalculateVUsPerScript(
      newGeoDistr,
      prevScenario.scriptConfigs
    ),
  };
};

export const changeServerLocation = (
  geoDistr: GeographicalDistrict[],
  prevScenario: Scenario,
  value: GeoAMI,
  itemIdx?: number
) => {
  const newGeoDistr: GeographicalDistrict[] = geoDistr.map((geo, idx) => {
    if (itemIdx !== idx) return geo;
    return {
      ...value,
      vus: geo.vus,
      pctg: geo.pctg,
    };
  });
  return {
    ...prevScenario,
    geoDistr: newGeoDistr,
  };
};

const isPercentageCorrect = (geoDistr: GeographicalDistrict[]): boolean => {
  return (
    geoDistr.reduce((totalLoad, geoDistr) => totalLoad + geoDistr.pctg, 0) ===
    100
  );
};

const calculateTotalSteps = (scripts: Script[]) => {
  return scripts.reduce((totalSteps, script) => {
    const scriptSteps = script.stepNames ? script.stepNames.length : 0;
    return totalSteps + scriptSteps;
  }, 0);
};

export const validateData = (
  formData: Scenario,
  maxVUs: number,
  maxDuration: number
) => {
  const errors: ValidationErrors = {
    vuGeographyError: formData.geoDistr?.length > 0 ? !formData.vusPerScript.every((item) => !item.includes(0)) : false,
    geoDistrLoadSumError: formData.geoDistr?.length > 0 ? !isPercentageCorrect(formData.geoDistr) : false,
    totalStepsError:
      calculateTotalSteps(formData.scriptConfigs) > MAX_STEPS_IN_SCENARIO,
    totalUserError: formData.totalUsers > maxVUs,
    rampUpStepsError:
      formData.rampUpSteps > formData.totalUsers ||
      formData.rampUpSteps > MAX_RAMP_UP_STEPS,
    durationError:
      formData.durationBased &&
      formData.fullLoadDuration > maxDuration - formData.rampUp,
    iterationsError:
      !formData.durationBased && formData.iterations > MAX_ITERATIONS,
    rampUpError: formData.rampUp > maxDuration,
    iterationDelayError:
      formData.iterationDelay > MAX_TIME_BETWEEN_ITERATIONS_S,
    maxDurationIterationError:
      !!formData.maxDurationIteration &&
      formData.maxDurationIteration > MAX_DURATION_ITERATION,
    timeoutDelay: formData.timeoutDelay > MAX_TIMEOUT_DELAY || formData.timeoutDelay < MIN_TIMEOUT_DELAY,
    thinkTime: formData.thinkTime > MAX_THINK_TIME || formData.thinkTime < MIN_THINK_TIME,
    thinkTimeMode: !thinkTimeModeOptions.find(options => options.type === formData.thinkTimeMode),
  };

  return errors;
};

export const checkWarnings = (formData: Scenario) => {
  const warnings: ValidationWarnings = {
    maxDurationIteration:
      !!formData.maxDurationIteration &&
      !!formData.minLimitDurationIteration &&
      formData.maxDurationIteration < formData.minLimitDurationIteration,
  };
  return warnings;
};

const convertToMinutes = (milliseconds: number): string => {
  const minutes = (milliseconds / 60000).toFixed(2);
  return minutes;
};

export const estimateIterationMaxDuration = (scenario: Scenario): number => {
  const estimation = Math.ceil(
    scenario.rampUp +
      scenario.iterations *
        (scenario.maxScriptReplayTimeout || 0) *
        SEC_MARGIN_DURATION_FOR_ITERATION +
      (scenario.iterations - 1) *
        parseFloat(convertToMinutes(scenario.iterationDelay * 1000))
  );
  return estimation > MAX_DURATION_ITERATION
    ? MAX_DURATION_ITERATION
    : estimation;
};

export const getScenarioErrorMessage = (errors: ValidationErrors): string => {
  const errorsString = Object.keys(errors).reduce((acc, key) => 
    errors[key as keyof ValidationErrors] ? `${key}, ${acc}` : acc, "");
  return "Scenario data is not valid: ("+errorsString.slice(0, -2)+")";
}

const scenarioScriptBody = (scriptConfigs: Scenario["scriptConfigs"]): CreateScenarioBody["scripts"] => {
  return scriptConfigs.map((scriptConfig) => {
    return {
      scriptId: scriptConfig.scriptId,
      virtualUsers: scriptConfig.virtualUsers,
    }
  });
}

export const createScenarioBody = (scenario: Scenario): CreateScenarioBody => {
  return {
    scenarioName: scenario.name,
    scripts: scenarioScriptBody(scenario.scriptConfigs),
    dedicatedProduct: DEDICATED_PRODUCT,
    durationBased: scenario.durationBased,
    durationM: Number(scenario.duration),
    pauseForIPs: scenario.pauseForIPs,
    iterations: Number(scenario.iterations),
    iterationDelayS: Number(scenario.iterationDelay),
    rampUpM: Number(scenario.rampUp),
    thinkTimeMS: Number(scenario.thinkTime),
    timeoutDelayS: Number(scenario.timeoutDelay),
    thinkTimeMode: scenario.thinkTimeMode,
  }
};

export const updateScenarioBody = (scenario: Scenario): UpdateScenarioBody => {
  return {
    name: scenario.name,
    scripts: scenarioScriptBody(scenario.scriptConfigs),
    durationBased: scenario.durationBased,
    pauseForIPs: scenario.pauseForIPs,
    rampUpSteps: Number(scenario.rampUpSteps),
    rampUp: Number(scenario.rampUp),
    iterationDelay: Number(scenario.iterationDelay),
    iterations: Number(scenario.iterations),
    maxDurationIteration: Number(scenario.maxDurationIteration) ?? 0,
    vusPerScript: scenario.vusPerScript,
    vusPerRegion: scenario.vusPerRegion,
    geoDistr: scenario.geoDistr,
    machineType: scenario.machineType
  }
};
