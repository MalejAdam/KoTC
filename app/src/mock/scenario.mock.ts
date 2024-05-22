import {Scenario} from "../../../electron/src/types/scenario";

export const dummyScenario: Scenario =  {
    projectId: "6135a820-b46f-11ee-9198-6d7e6a50463e",
    debugMode: "debug",
    durationBased: true,
    scriptConfigs: [
        {
            scriptPath: "s3 script path",
            hasPlayedBack: true,
            fileName: "load.zip",
            scriptDescription: "",
            virtualUsers: 5,
            project: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            type: "SRC",
            mappedDatabanks: [
                {
                    "rows": 5,
                    "name": "databank"
                }
            ],
            isAPI: false,
            stepNames: [
                "1.Step 1",
                "2.Step 2",
                "3.Step 3"
            ],
            accountId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            scriptId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            load: 50,
            relativePath: "1111a111-a11a-11aa-1111-1a1a1a11111a/1111a111-a11a-11aa-1111-1a1a1a11111a",
            name: "test-error",
            runDatabanks: "Randomly",
            needsTunnel: false,
            createDate: "Thu, 4 March 2024 13:26:08 GMT"
        },
        {
            scriptPath: "s3 script path",
            hasPlayedBack: true,
            fileName: "load.zip",
            scriptDescription: "",
            virtualUsers: 5,
            project: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            type: "SRC",
            mappedDatabanks: [
                {
                    "rows": 5,
                    "name": "databank"
                }
            ],
            isAPI: false,
            stepNames: [
                "1.Step 1",
                "2.Step 2",
            ],
            accountId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            scriptId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
            load: 50,
            relativePath: "1111a111-a11a-11aa-1111-1a1a1a11111a/1111a111-a11a-11aa-1111-1a1a1a11111a",
            name: "test-error",
            runDatabanks: "Randomly",
            needsTunnel: false,
            createDate: "Thu, 4 March 2024 13:26:08 GMT"
        }
    ],
    iterations: 1,
    thinkTime: 100,
    projectName: "Project Name",
    name: "Scenario A",
    createDateString: "03/04/24, 09:54",
    scenarioId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
    useScriptSettings: true,
    duration: 7,
    thinkTimeMode: "recorded",
    pauseForIPs: false,
    accountId: "1111a111-a11a-11aa-1111-1a1a1a11111a",
    rampUpSteps: 10,
    vusPerScript: [[2, 2], [3, 3]],
    runWithTunnel: false,
    vusPerRegion: [5, 5],
    timeoutDelay: 30,
    totalUsers: 10,
    iterationDelay: 30,
    enableDebugTime: 1,
    geoDistr: [
        {
            subnetId: "subnet-056c038db0337ef50",
            pctg: 50,
            vus: 5,
            securityGroups: ["sg-57a2f91c"],
            label: "US East (N. Virginia)",
            region: "us-east-1",
            ami: "ami-0a6c63a201f0145b3"
        },
        {
            subnetId: "subnet-0be16ab67aac83f65",
            pctg: 50,
            vus: 5,
            securityGroups: ["sg-04a7de3cc2d1db196"],
            label: "AP South (Mumbai)",
            region: "ap-south-1",
            ami: "ami-0c473323ddd21123e"
        }
    ],
    createDate: "Mon, 04 Mar 2024 11:23:31 GMT",
    fullLoadDuration: 5,
    rampUp: 2,
    machineType: "standard",
    recommendedMachineType: false,
}