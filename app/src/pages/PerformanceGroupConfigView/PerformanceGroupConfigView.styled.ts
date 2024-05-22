import { Card, Grid, styled, Typography, Paper, Button, Select, TextField } from '@mui/material';
import { NEUTRAL_00, NEUTRAL_20, NEUTRAL_50 } from '../../theme/muiTheme';
export const ContainerPaper = styled(Paper)({ padding: '2rem' });

export const TabGridContainer = styled(Grid)({ padding: '1rem'})

export const TabCard= styled(Card)({
  padding: '1rem',
  marginBottom: '2rem'
})

export const TabSubTitle = styled(Typography)({
  fontWeight: 'bold',
  paddingBottom: '1rem'
})

export const NormalText = styled(Typography)({
  paddingBottom: '1rem'
});

export const StyledGreyText = styled(Typography)({
  fontSize: '14px',
  color: NEUTRAL_50
});

export const StyledButton = styled(Button)({
  marginLeft: '1rem',
  '&:disabled': {
    backgroundColor: NEUTRAL_20,
    color: NEUTRAL_00,
  },
});

export const StyledNumericalInput = styled(TextField)({
  width: "100px",
  "& input[type='number']": {
    MozAppearance: "textfield",
    appearance: "textfield",
  },
  "& input[type='number']::-webkit-inner-spin-button, & input[type='number']::-webkit-outer-spin-button":
    {
      opacity: 1,
    },
  "& .MuiFormHelperText-root": {
    width: "450px",
    left: "-230px",
    position: "relative",
  },
});

export const StyledText = styled(Typography)({
  width: "225px",
  marginRight: "px",
});

export const StyledSelect = styled(Select)({
  width: '100px', marginRight: "10px"
});

export const Container = styled(Grid)({
  marginBottom: "20px",
});