import { TextField, Typography, styled } from "@mui/material";

export const InputRow = styled('div')({
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    height: '50px',
  });

  export const CenteredSpan = styled('span')({
    display: 'flex',
    alignItems: 'center',
  });

export const InputLabel = styled(Typography)({
    display: 'inline-block',
    marginRight: '20px',
    variant: "subtitle1"
  });

  export const NumericalTextField = styled(TextField)({
    width: '100px',
    '& .MuiFormHelperText-root': {
      width: '350px',
    },
  });
    
  export const StyledText = styled(Typography)({
    whiteSpace: 'nowrap',
    fontSize: '1rem',
  });
