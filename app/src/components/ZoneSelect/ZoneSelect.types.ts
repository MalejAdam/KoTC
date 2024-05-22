import { GeoAMI } from '@src/pages/PerformanceGroupConfigView/components/LoadDistribution/LoadDistribution.types';

export type ZoneSelectProps = {
  setSelectedZoneName: (newZone?: GeoAMI) => void;
  availableZones:  GeoAMI[],
  selectedZoneName?:  string,
}