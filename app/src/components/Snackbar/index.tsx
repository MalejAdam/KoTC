import { Alert, Snackbar as SnackbarRoot, SnackbarProps } from "@mui/material";
import { ReactNode } from "react";
import { VariantColor } from "@src/types/snackbar";

type TooltipProps = SnackbarProps & {
    children: ReactNode;
    type?: keyof typeof VariantColor;
    onClose?: () => void;
};

export const Snackbar = ({autoHideDuration = 5000, children, type = "info", onClose, anchorOrigin = { vertical: "top", horizontal: "center"}, ...props}: TooltipProps) =>
    <SnackbarRoot autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={anchorOrigin} {...props}>
        <Alert severity={type} variant="filled" onClose={onClose}>
            {children}
        </Alert>
    </SnackbarRoot>
