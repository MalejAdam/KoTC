import React from "react";

import {
  PerformanceGroupConfigContextProps,
  PerformanceGroupConfigManagerProps,
  TestMode,
} from "./PerformanceGroupConfigContext.types";
import { PerformanceGroupConfigContext } from "./PerformanceGroupConfigContext.context";

const PerformanceGroupConfigContextManager: React.FC<
  PerformanceGroupConfigManagerProps
> = ({ children, scenario, geoAMIs, user, startTestRun, saveScenarioBeforeClose, executeTranslation, isLoading }) => {
  console.log("PerformanceGroupConfigContextManager", scenario);
  // IN THE FUTURE IT WILL BE USED TO DETERMINE THE TEST MODE
  // FOR THE PURPOSE OF INTERACTION WITH THE TC IT WILL BE UI
  // const testMode = scenario.scriptConfigs[0].isAPI ? TestMode.API : TestMode.UI;
  const testMode = TestMode.UI;
  const maxVUs = user.limits.maxVUs;
  const addOn500Vus = user.addOn500Vus || 0;

  const performanceGroupConfigContextValue: PerformanceGroupConfigContextProps =
    {
      scenario,
      geoAMIs,
      testMode,
      user,
      maxVUs,
      addOn500Vus,
      startTestRun,
      executeTranslation,
      saveScenarioBeforeClose,
      isLoading
    };

  return (
    <PerformanceGroupConfigContext.Provider
      value={performanceGroupConfigContextValue}
    >
      {children}
    </PerformanceGroupConfigContext.Provider>
  );
};

export default PerformanceGroupConfigContextManager;
