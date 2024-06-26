import {
  TableCell,
  TableHead,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import {
  NEUTRAL_00,
  NEUTRAL_10,
  PRODUCT_80,
} from "../../../../../../theme/muiTheme";

export const StyledText = styled(Typography)({
  whiteSpace: "nowrap",
  fontSize: "1rem",
  color: PRODUCT_80,
});

export const VUTableHead = styled(TableHead)({
  background: PRODUCT_80,
});

export const VUHeaderCell = styled(TableCell)({
  borderRight: `2px solid ${NEUTRAL_10}`,
  color: NEUTRAL_00,
});

export const StyledCell = styled(TableCell)({
  borderRight: `2px solid ${PRODUCT_80}`,
});

export const StyledNumericalInput = styled(TextField)({
  width: "125px",
  "& input[type='number']": {
    MozAppearance: "textfield",
    appearance: "textfield",
  },
  "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
    {
      opacity: 1,
    },
});

export const LastCell = styled(TableCell)({
  borderRight: `2px solid ${NEUTRAL_00}`,
});
