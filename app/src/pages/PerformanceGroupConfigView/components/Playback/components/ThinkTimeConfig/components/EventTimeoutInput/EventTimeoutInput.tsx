import React from "react";
import { Grid } from "@mui/material";
import { Container, StyledText, StyledNumericalInput } from "../../../../../../PerformanceGroupConfigView.styled";
import { MAX_TIMEOUT_DELAY, MIN_TIMEOUT_DELAY } from "../../../../../../PerformanceGroupConfigView.utils";
import { EventTimeoutProps } from "./EventTimeoutInput.types";

export const EventInput: React.FC<EventTimeoutProps> = ({
  name,
  label,
  value,
  error,
  errorMessage,
  onChange,
  isOverrideThinkTime,
}) => {

  const handleChange = ({ target }: React.ChangeEvent<{ key?: string; value: string }>): void => {
    onChange(name, target.value);
  };

  return (
    <Container id={`singleInputRow-${label}`} container>
      <Grid container>
        <Grid item>
          <StyledText variant="subtitle1">{label}</StyledText>
        </Grid>
        <Grid item>
          <StyledNumericalInput
            value={value}
            disabled={isOverrideThinkTime}
            onChange={handleChange}
            inputProps={{ min: MIN_TIMEOUT_DELAY, max: MAX_TIMEOUT_DELAY, style: { textAlign: "center" } }}
            error={error}
            helperText={(error && errorMessage)}
            variant="standard"
            type="number"
          />
        </Grid>
      </Grid>
    </Container>
  );
};
