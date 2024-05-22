import * as React from 'react';
import { SpinnerOverlayProps } from './SpinnerOverlay.types';
import { StyledBackground, StyledProgress, StyledText } from './SpinnerOverlay.styled';

export const  SpinnerOverlay: React.FC<SpinnerOverlayProps> = ({text}) => {
  return (
    <StyledBackground sx={{ display: 'flex' }}>
        <StyledText>{text}</StyledText>
        <StyledProgress size={80}/>
    </StyledBackground>
  );
}