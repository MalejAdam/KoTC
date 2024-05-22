import React, { Fragment } from 'react';
import { LoadDistributionProps } from './LoadDistribution.types';
import { LoadDistributionTable } from './components/LoadDistributionTable/LoadDistributionTable';
import { VirtualUsersPerScriptTable } from './components/VirtualUsersPerScriptTable/VirtualUsersPerScriptTable';
import { LoadDistributionInfo } from './components/LoadDistributionInfo/LoadDistributionInfo';
import { getErrorMessages } from './LoadDistribution.utils';
import { ErrorText } from './LoadDistribution.styled';
import { usePerformanceGroupConfigContext } from '../../../../context/PerformanceGroupConfigContext/PerformanceGroupConfigContext.hook';
import { Typography } from '@mui/material';



export const LoadDistribution: React.FC<LoadDistributionProps> = ({
  scenario,
  onChange,
  errors
}) => {
  const { maxVUs, addOn500Vus } = usePerformanceGroupConfigContext();
  const { totalUsers, scriptConfigs, geoDistr } = scenario;
  const maxUsers = maxVUs + (500 * addOn500Vus);
  const errorMessages = getErrorMessages(maxUsers);

  return (
      <Fragment>
         {scriptConfigs.length ? (
          <LoadDistributionInfo
            value={totalUsers}
            errorMessage={errorMessages.totalUserError}
            isError={errors.totalUserError}
          />) : 
          <Typography>Please add Tests to your Performance Group to access Load Distribution form section</Typography>
          }
        {scriptConfigs.length ? (
          <React.Fragment>
            <VirtualUsersPerScriptTable
              scripts={scriptConfigs}
              geoDistr={geoDistr}
              vusPerScript={scenario.vusPerScript}
              onChange={onChange}
            />
            <ErrorText>{errors.totalStepsError && errorMessages.totalStepsError}</ErrorText>
            <ErrorText>{errors.vuGeographyError && errorMessages.vuGeographyError}</ErrorText>
            <LoadDistributionTable
              geoDistr={geoDistr}
              vusPerRegion={scenario.vusPerRegion}
              onChage={onChange}
              isError={errors.geoDistrLoadSumError}
              errorMessage={errorMessages.geoDistrLoadSumError}
            />
          </React.Fragment>
        ) : null}
      </Fragment>
  );
};
