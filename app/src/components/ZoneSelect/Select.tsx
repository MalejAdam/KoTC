import { SelectProps } from "@mui/material/Select/Select";
import { Select } from "@mui/material";

export const StringSelect = (props: SelectProps<string>) => (
  <Select {...props} />
);
