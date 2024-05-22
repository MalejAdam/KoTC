import React from "react";
import { Checkbox, Grid, Typography } from "@mui/material";
import { PlaybackProps } from "./Playback.types";
import { ThinkTimeConfig } from "./components/ThinkTimeConfig/ThinkTimeConfig";

export const Playback: React.FC<PlaybackProps> = ({
  onChange,
  scenarioData,
  errors
}) => {

  const [isOverrideThinkTime, setIsOverrideThinkTime] = React.useState<boolean>(scenarioData.thinkTimeMode.toUpperCase() === "RECORDED");
  const changeOverride = () => setIsOverrideThinkTime(!isOverrideThinkTime);

  return (
    <Grid container>
      <Grid item>
        <Grid container>
          <Grid item>
            <Typography>
              <Checkbox
                onChange={changeOverride}
                checked={!isOverrideThinkTime}
              />
              Override think times and timeouts configured in script
            </Typography>
          </Grid>
        </Grid>
        <ThinkTimeConfig
          errors={errors}
          onChange={onChange}
          scenarioData={scenarioData}
          isOverrideThinkTime={isOverrideThinkTime}
        >
        </ThinkTimeConfig>
      </Grid>
    </Grid>
  );
};
