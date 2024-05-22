import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TunnelRunDialogProps } from "./TunnelRunDialog.types";
import { StyledDialog, StyledText } from "./TunnelRunDialog.styled";

export const TunnelRunDialog: React.FC<TunnelRunDialogProps> = ({
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
            You are about to launch a performance test with more than 15 VUs.
            LoadNinja does not recommend using the tunnel for tests of more than
            15 VUs. If your application is not accessible outside your network,
            you may need to add our load generator IP addresses to an
            allow-list.
          </StyledText>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAccept} autoFocus>
          Run using the tunnel
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};
