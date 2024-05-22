import React from "react";
import { Grid, Typography } from "@mui/material";
import { EventInput } from "./components/EventTimeoutInput/EventTimeoutInput";
import { ThinkTimeInput } from "./components/ThinkTimeInput/ThinkTimeInput";
import { thinkTimeDescriptionString } from "./ThinkTimeConfig.utils";
import { getErrorMessage, rowDataHash } from "../../Playback.utils";
import { ThinkTimeConfigProps } from "./ThinkTimeConfig.types";

export const ThinkTimeConfig: React.FC<ThinkTimeConfigProps> = ({
  scenarioData,
  onChange,
  isOverrideThinkTime,
  errors
}) => {

  const errorMessages = getErrorMessage();

  return (
    <Grid container>
      <Grid container>
        <Grid item>
          <Typography style={{ marginBottom: "15px" }}>
            Configure the think time for this scenario
          </Typography>
          <Typography style={{ marginBottom: "15px" }}>
            {thinkTimeDescriptionString(scenarioData.thinkTimeMode)}
          </Typography>
        </Grid>
      </Grid>
      <ThinkTimeInput
        onChange={onChange}
        errors={errors}
        isOverrideThinkTime={isOverrideThinkTime}
        scenarioData={scenarioData}
      />
      <EventInput
        onChange={onChange}
        isOverrideThinkTime={isOverrideThinkTime}
        error={errors[rowDataHash.timeoutDelay.errorKey]}
        errorMessage={errorMessages[rowDataHash.timeoutDelay.errorKey] ?? ""}
        label={rowDataHash.timeoutDelay.label}
        name={rowDataHash.timeoutDelay.name}
        scenarioData={scenarioData}
        value={scenarioData.timeoutDelay}
      />
    </Grid>
  );
};