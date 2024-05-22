import React from 'react';
import { MenuItem } from '@mui/material';
import { SelectStyled } from './Select.styled';
import { StringSelect as Select} from './Select';
import { ZoneSelectProps } from './ZoneSelect.types';

export const ZoneSelect: React.FC<ZoneSelectProps> = ({ selectedZoneName, setSelectedZoneName, availableZones }) => {

const handleChangeSelection = (value: string) => {
    const zone = availableZones.find(zone => zone.region === value)
    setSelectedZoneName(zone);
}

  return (
    <SelectStyled>
      <Select
        data-testid="ZoneSelect.Select"
        value={selectedZoneName}
        labelId="zone-select"
        onChange={(event) => handleChangeSelection(event.target.value)}
        variant='standard'
      >
        {availableZones.map(({ label, region }) => (
          <MenuItem
            value={region}
            key={region}
          >
            <span data-testid="ZoneSelect.MenuItem">{label}</span>
          </MenuItem>
        ))}
      </Select>
    </SelectStyled>
  );
};
