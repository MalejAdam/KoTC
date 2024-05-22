export type PostTestRunData = {
    scenarioId: string;
    dedicatedProduct: string;
}

export type PostTestRunArgs = {
    projectId: string;
    data: PostTestRunData;
}

export type GetTestRunErrorsArgs = {
    projectId: string;
    testRunId: string;
}

export type IErrorStats = {
    createDate: string;
    debug: boolean;
    devConsoleS3Path: string;
    diagnosticId: string;
    errorMessage: string;
    harS3Path: string;
    hasHar: boolean;
    hasHttpErrorOnResources: boolean;
    hasNavigation: boolean;
    htmlS3Path: string;
    imageS3Path: string;
    iteration: string;
    mochaLogS3Path: string;
    navigationStatusCode: number;
    status: string;
    stepName: string;
    testId: string;
    url: string;
    virtualUser: string;
}

export type GetTestRunScriptSteps = {
    projectId: string;
    testRunId: string;
}

export type GetTestRunNetworkMetrics = {
    projectId: string;
    testRunId: string;
    diagnosticId: string;
}
