import React from "react";
import { LoadDistributionInfoProps } from "./LoadDistributionInfo.types";
import {
  CenteredSpan,
  InputLabel,
  NumericalTextField,
  StyledText,
} from "./LoadDistributionInfo.styled";
import { Grid } from "@mui/material";
import { MAX_STEPS_IN_SCENARIO } from "../../../../PerformanceGroupConfigView.utils";

export const LoadDistributionInfo: React.FC<LoadDistributionInfoProps> = ({
  value,
  errorMessage,
  isError,
}) => {
  return (
    <Grid container>
      <Grid marginBottom={2}>
        <CenteredSpan>
          <InputLabel id="scenarios-total-vu">
            Number of concurrent virtual users
            {/* 
            // TODO: change impelementation to prevent nested paragraph tags, it causes error in the console
            <StyledText>Number of concurrent virtual users</StyledText> */}
          </InputLabel>
          <NumericalTextField
            value={value}
            disabled
            inputProps={{ style: { textAlign: "center" } }}
            variant="standard"
            id="scenarios-total-vu-input"
            error={isError}
            helperText={isError && errorMessage}
          />
        </CenteredSpan>
      </Grid>
      <Grid item marginBottom={2}>
        <StyledText id="scenario-builder-step-limit">
          Your scenario can have up to {MAX_STEPS_IN_SCENARIO} steps across all
          scripts.
        </StyledText>
      </Grid>
    </Grid>
  );
};
