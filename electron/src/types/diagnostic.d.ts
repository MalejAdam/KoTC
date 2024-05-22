type ScriptsStepsItem = {
    diagnosticId: string;
    stepName: string;
}

export type ScriptsSteps = {
    [key: string]: ScriptsStepsItem[];
}