import User from "../types/user";

export const dummyUser: User = {
    version: 0,
    userId: "1",
    firstName: "name1",
    lastName: "name2",
    accountId: "aId",
    accountStatus: "verified",
    currentConsumptionTotal: 0,
    consumption: {
        sumConsumptionTotal: 0,
        totalTestRuns: 0,
        availableTestTime: 100,
        lastStartCalculationDate: 1710147458641
    },
    limits: {
        maxConcurrentTests: 2,
        maxVUs: 100,
        accountType: "basic",
        maxTotalTestTime: 2000,
        maxTestDuration: 1000,
        enforcedMaxDuration: 1000,
        enforcedMaxVUs: 40,
        addOn500Vus: 0,
        enforcedMaxConcurrent: 2
    },
    subAccount: false,
    createDate: "Thu, 11 Jan 2024 12:23:00 GMT",
    proxyPort: 0,
    planEndDate: "",
    isPlanCanceled: false,
    isExpired: false,
    dedicatedIps: [],
    addOn1HourTestDuration: 0,
}