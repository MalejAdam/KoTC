import React from "react";
import { Grid, MenuItem } from "@mui/material";
import {
  StyledSelect,
  Container,
  StyledNumericalInput,
  StyledText
} from "../../../../../../PerformanceGroupConfigView.styled";
import { getErrorMessage, rowDataHash } from "../../../../Playback.utils";
import { MAX_THINK_TIME, MIN_THINK_TIME, thinkTimeModeOptions } from "./../../../../../../PerformanceGroupConfigView.utils";
import { ThinkTimeInputProps, ThinkTimeOptions } from "./ThinkTimeInput.types";
import { Scenario } from "../../../../../../../../../../electron/src/types/scenario";

export const ThinkTimeInput: React.FC<ThinkTimeInputProps> = ({
  onChange,
  errors,
  scenarioData,
  isOverrideThinkTime
}) => {

  const createThinkTimeMenuItem = (thinkTimeOptions: ThinkTimeOptions) => {
    return (
      <MenuItem
        key={thinkTimeOptions.type}
        id={`scenario-playback-${thinkTimeOptions.type}`}
        value={thinkTimeOptions.type.toLowerCase()}
      >
        {thinkTimeOptions.display}
      </MenuItem>
    )
  };

  const checkThinkTimeMode = (thinkTimeMode: Scenario["thinkTimeMode"], thinkTimeModeValue?: Scenario["thinkTimeMode"]): boolean => {
    return (thinkTimeModeValue ?? scenarioData.thinkTimeMode) === thinkTimeMode;
  };

  const handleThinkTimeInput = (e: any) => {
    onChange(rowDataHash.thinkTimeMode.name, e.target.value);
    onChange(rowDataHash.thinkTime.name, checkThinkTimeMode("minimum") ? MIN_THINK_TIME : scenarioData.thinkTime);
  }

  const errorMessages = getErrorMessage();

  return (
    <Container>
      <Grid container>
        <Grid item>
          <StyledText>{rowDataHash.thinkTime.label}</StyledText>
        </Grid>
        <Grid item id={`singleInputRow-${rowDataHash.thinkTimeMode.label}`}>
          <StyledSelect
            value={scenarioData.thinkTimeMode.toLowerCase()}
            variant="standard"
            onChange={handleThinkTimeInput}
            disabled={isOverrideThinkTime}
          >
            {thinkTimeModeOptions.map(option => createThinkTimeMenuItem(option))}
          </StyledSelect>
        </Grid>
        <Grid item id={`singleInputRow-${rowDataHash.thinkTime.label}`}>
          {!checkThinkTimeMode("recorded") ?
            <StyledNumericalInput
              value={checkThinkTimeMode("minimum") ? MIN_THINK_TIME : scenarioData.thinkTime}
              disabled={isOverrideThinkTime || checkThinkTimeMode("minimum")}
              onChange={(e) => onChange(rowDataHash.thinkTime.name, e.target.value)}
              variant="standard"
              type="number"
              helperText={(errors[rowDataHash.thinkTime.errorKey] && errorMessages[rowDataHash.thinkTime.errorKey])}
              error={errors[rowDataHash.thinkTime.errorKey]}
              inputProps={{ min: MIN_THINK_TIME, max: MAX_THINK_TIME, style: { textAlign: "center" } }}
            />
            : null}
        </Grid>
      </Grid>
    </Container>
  );
};
