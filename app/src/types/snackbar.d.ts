import {ERROR_40, INFORMATION_40, SUCCESS_40, WARNING_30} from "@src/theme/muiTheme.ts";

export enum VariantColor {
    warning = WARNING_30,
    error = ERROR_40,
    info = INFORMATION_40,
    success = SUCCESS_40
}

export type SnackbarData = {
    type: keyof typeof VariantColor;
    showSnackBar: boolean;
    message: string;
}