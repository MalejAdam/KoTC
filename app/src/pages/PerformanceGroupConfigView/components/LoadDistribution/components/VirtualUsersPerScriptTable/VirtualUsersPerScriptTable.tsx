import React from "react";
import { headerLabels } from "./VirtualUsersPerScriptTable.utils";
import {
  TableColumns,
  VirtualUsersPerScriptTableProps,
} from "./VirtualUsersPerScriptTable.types";
import { TableRow, TableBody, Typography, Table } from "@mui/material";
import {
  LastCell,
  StyledCell,
  StyledNumericalInput,
  StyledText,
  VUHeaderCell,
  VUTableHead,
} from "./VirtualUsersPerScriptTable.styled";
import Script from "@src/types/script";
import { ChangeType } from "../../../../PerformanceGroupConfigView.types";

export const VirtualUsersPerScriptTable: React.FC<
  VirtualUsersPerScriptTableProps
> = ({ scripts, geoDistr, vusPerScript, onChange }) => {
  const calculateTotalNumberOfStepsInAllScripts = (): number => {
    let sumOfStepsInScripts = 0;
    if (scripts && scripts.length) {
      scripts.forEach((script) => {
        const scriptSteps = script.stepNames ? script.stepNames.length : 0;
        sumOfStepsInScripts += scriptSteps;
      });
    }
    return sumOfStepsInScripts;
  };

  const calculateValue = (
    key: TableColumns,
    script: Script,
    idx: number
  ): number | string => {
    switch (key) {
      case TableColumns.steps:
        return script[key] ? script[key].length : 0;
      case TableColumns.databanks:
        return script[key].length;
      case TableColumns.load:
        return `${parseFloat(script[key]).toFixed(2)}%`;
      case TableColumns.geography:
        return (
          geoDistr &&
          vusPerScript &&
          geoDistr
            .map(
              (geo, geoIndex) =>
                `${geo.label.split("(")[0]}: ${
                  vusPerScript[idx] ? vusPerScript[idx][geoIndex] : "-"
                } VUs`
            )
            .join("\n")
        );
      default:
        return script[key];
    }
  };

  return (
    <Table>
      <VUTableHead>
        <TableRow key={"VUTableHeaderRow"}>
          {headerLabels.map((label) => (
            <VUHeaderCell key={label.label} align="center">
              {label.label}
            </VUHeaderCell>
          ))}
        </TableRow>
      </VUTableHead>
      <TableBody>
        {scripts &&
          scripts.map((script, idx) => (
            <TableRow key={script.scriptId}>
              {headerLabels.map(({ key, isChangable }) => {
                const value = calculateValue(key, script, idx);

                if (key === TableColumns.geography)
                  return (
                    <LastCell align="center" key={value}>
                      <Typography>
                        {(value as string).split("\n").map((str) => str)}
                      </Typography>
                    </LastCell>
                  );
                return (
                  <StyledCell
                    align="center"
                    key={`scriptVUsStyled-${key}-${idx}`}
                  >
                    {isChangable ? (
                      <StyledNumericalInput
                        key={`scriptVUs-${idx}`}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                        value={value}
                        type="number"
                        variant="standard"
                        onChange={(e) =>
                          onChange(ChangeType.vusPerScript, idx, e.target.value)
                        }
                      />
                    ) : (
                      <Typography>{value}</Typography>
                    )}
                  </StyledCell>
                );
              })}
            </TableRow>
          ))}
        <TableRow key={"totalSteps"}>
          <LastCell>
            <StyledText>
              Total Steps: {calculateTotalNumberOfStepsInAllScripts()}
            </StyledText>
          </LastCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
