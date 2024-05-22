import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ServerWaitDialogProps } from "./ServerWaitDialog.types";
import { StyledDialog, StyledText } from "./ServerWaitDialog.styled";

export const ServerWaitDialog: React.FC<ServerWaitDialogProps> = ({
  open,
  onClose,
  onAccept,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle>Display Load Generator IPs</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <StyledText>
            Checking this box initializes the load generators, but does not
            start the load test until you give the go-ahead.
          </StyledText>
          <StyledText>
            The time spent waiting to start the test will be counted against
            your load testing time.
          </StyledText>
          <StyledText>
            LoadNinja will wait for <strong>30 minutes</strong> for you to start
            the test. If you have not started the test by that time, the test
            will time out and your IP reservation will be lost.
          </StyledText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAccept} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
