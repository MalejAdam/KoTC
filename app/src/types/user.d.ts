import { AmiRegions, DedicatedIp } from './ami-regions';


export type UserAccountLimits = {
  maxConcurrentTests: number;
  maxVUs: number;
  accountType: string;
  maxTotalTestTime: number;
  maxTestDuration: number;
  enforcedMaxDuration: number;
  enforcedMaxVUs: number;
  addOn500Vus: number;
  enforcedMaxConcurrent: number;
}

type User = {
  version: number;
  userId: string;
  firstName: string;
  lastName: string;
  accountId: string;
  accountStatus: string;
  currentConsumptionTotal: number;
  consumption: {
    sumConsumptionTotal: number;
    totalTestRuns: number;
    availableTestTime: number;
    lastStartCalculationDate: number;
  };
  limits: UserAccountLimits;
  subAccount: boolean;
  createDate: string;
  proxyPort: number;
  rollOver?: {
    hours: number;
  };
  planEndDate: string;
  isPlanCanceled: boolean;
  isExpired: boolean;
  pendingHoursPackage?: number;
  pendingDedicatedRegions?: AmiRegions[];
  additionalHours?: number;
  addOn10?: number;
  addOn50?: number;
  onDemandTime?: number;
  addOn500Vus?: number;
  dedicatedIps: DedicatedIp[];
  impersonateId?: string;
  e2e?: boolean;
  pendingProperties?: string[];
  addOn1HourTestDuration?: number;
}

export default User;
