import { CircularProgress, Typography, styled } from "@mui/material";

export const StyledProgress = styled(CircularProgress)({
  margin: "auto",
});

export const StyledText = styled(Typography)({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  top: "58%",
  color: "white",
  fontWeight: "bold",
  fontSize: "1.5rem",
});

export const StyledBackground = styled("div")({
  position: "fixed",
  left: "0%",
  top: "0%",
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,.3) url(spinner.gif) center center no-repeat",
});
