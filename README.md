# vite-electron for lntc integration

## Description

Test project to check vite+electron co-operation ;).

## System Requirements

```
node 20
```

## Installation

To install all dependencies for this project, run the following command:

```
npm run install:all
```

## Before Build

In the `electron` folder please use `.env.example` and rename it to `.env`. Iniside there is stringified JSON with all the params necessary to run the app.

```
ARGS='{"baseUrl":"<API_BASE_URL>","showPGForm":true,"projectId":"<PROJECT_ID>","scenarioId":"<SCENARIO_ID>","accountId":"<ACCOUNT_ID>","apiKey":"<API_KEY>"}'
```

---

**NOTES**

- If `<API_BASE_URL>` is not set the production url will be used `https://z6qzzgyj6a.execute-api.us-east-1.amazonaws.com/prd`
- If `showPGForm` is set to `true` the UI will show the "Performance Group Page". Please provide the `<SCENARIO_ID>` and `<PROJECT_ID>` if you want to update an scenario.
- If `showPGForm` is set to `false` the UI will show the "Load Test Result Page". Please provide the `<TEST_RUN_ID>` and `<PROJECT_ID>` if you want to view a testRun.
---

## Build

To Start the project in development mode

```
npm run start:dev or npm run start:dev:win on windows
```

To Build the app and starts the built version.

```
npm run start:build
```

To create electron executable app

```
npm run build:pack
```

## Running electron app

Please note that the builded electron app required one argument in form of stringify JSON, same as in the .env file.

```
 ./electron.exe '{\"showPGForm\":\"true\"}'
```

## Known issues

- mac os executable crashes after launch (research in progress - issue is related to lack of Apple Dev Id)
