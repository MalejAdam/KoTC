import React from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Table,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  LastCell,
  StyledAddIcon,
  StyledAddText,
  StyledCell,
  StyledNumericalInput,
  VUHeaderCell,
  VUTableHead,
} from "./LoadDistributionTable.styled";
import { LoadDistributionTableProps } from "./LoadDistributionTable.types";
import { GeoAMI } from "../../LoadDistribution.types";
import { GeographicalDistrict } from "../../../../../../../../electron/src/types/scenario";
import { ZoneSelect } from "../../../../../../components/ZoneSelect/ZoneSelect";
import { headerLabels } from "./LoadDistributionTable.utils";
import { ChangeType } from "../../../../PerformanceGroupConfigView.types";
import { usePerformanceGroupConfigContext } from "../../../../../../context/PerformanceGroupConfigContext/PerformanceGroupConfigContext.hook";
import { faPlusCircle, faTrash } from "@fortawesome/pro-regular-svg-icons";

export const LoadDistributionTable: React.FC<LoadDistributionTableProps> = ({
  geoDistr,
  vusPerRegion,
  onChage,
  errorMessage,
  isError,
}) => {
  const { geoAMIs } = usePerformanceGroupConfigContext();

  const getAvailableZones = (selectedZone: GeographicalDistrict): GeoAMI[] => {
    const availableZones = geoAMIs.filter(
      (zone) => !geoDistr.find((geo) => geo.region === zone.region)
    );
    availableZones.push(selectedZone);
    availableZones.sort((a, b) => {
      const zoneA = a.label.toUpperCase();
      const zoneB = b.label.toUpperCase();

      if (zoneA > zoneB) return 1;
      else if (zoneA < zoneB) return -1;
      return 0;
    });
    return availableZones;
  };

  return (
    <Container>
      <Table>
        <VUTableHead>
          <TableRow key={"VUTableHead-unique-key"}>
            {headerLabels.map((label) => (
              <VUHeaderCell key={label} align="center">
                {label}
              </VUHeaderCell>
            ))}
          </TableRow>
        </VUTableHead>
        <TableBody>
          {geoDistr &&
            geoDistr.map((geo, geoIndex) => {
              const availableZones = getAvailableZones(geo);
              return (
                <TableRow key={geo.label}>
                  <StyledCell align="center">
                    <ZoneSelect
                      availableZones={availableZones}
                      selectedZoneName={
                        availableZones.find(
                          (item) => item.region === geo.region
                        )?.region || undefined
                      }
                      setSelectedZoneName={(newZone) =>
                        onChage(
                          ChangeType.changeServerLocation,
                          geoIndex,
                          newZone
                        )
                      }
                    />
                  </StyledCell>
                  <StyledCell align="center">
                    <StyledNumericalInput
                      value={geo.pctg}
                      type="number"
                      variant="standard"
                      onChange={(e) =>
                        onChage(
                          ChangeType.changeServerLoad,
                          geoIndex,
                          e.target.value
                        )
                      }
                      InputProps={{
                        inputProps: {
                          type: "number",
                          max: 100,
                          min: 1,
                          style: { textAlign: "center" },
                        },
                      }}
                      error={isError}
                      helperText={isError && errorMessage}
                    />
                  </StyledCell>
                  <StyledCell align="center">
                    <Typography>{vusPerRegion[geoIndex]} VUs</Typography>
                  </StyledCell>
                  <LastCell align="center">
                    <IconButton
                      onClick={() =>
                        onChage(ChangeType.removeLocation, geoIndex)
                      }
                      disabled={!geoDistr || geoDistr.length < 2}
                      color="secondary"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </LastCell>
                </TableRow>
              );
            })}
          <TableRow>
            <TableCell>
              <IconButton
                disabled={geoDistr.length === geoAMIs.length}
                onClick={() => onChage(ChangeType.addLocation)}
              >
                <StyledAddIcon icon={faPlusCircle} />
                <StyledAddText>Add location</StyledAddText>
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};
