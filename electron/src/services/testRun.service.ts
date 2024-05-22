// create a class to handle the script service it must import connector class and based on its functio-ns

import { Connector } from "../utils/connector";
import { IErrorStats, PostTestRunData } from "../types/test-run";
import { downloadAndReadZip } from "../utils/zip";
import { ScriptsSteps } from "../types/diagnostic";

export class TestRunService {
  private connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  async getSingleTestRun(
    projectId: string,
    testRunId: string
  ) {
    const response = await this.connector.get(
      "/projects/" + projectId + "/testRuns/" + testRunId
    );
    return response.data;
  }

  async postTestRun(
    projectId: string,
    data: PostTestRunData
  ) {
    const response = await this.connector.post(
      "/projects/" + projectId + "/testRuns",
      data
    );
    return response.data;
  }

  async patchSingleTestRun(
    projectId: string,
    testRunId: string,
    data: any
  ){
    const response = await this.connector.patch(
      "/projects/" + projectId + "/testRuns/" + testRunId,
      data
    );

    return response.data;
  }

  async getTestRunErrors(
    projectId: string,
    testRunId: string,
  ): Promise<IErrorStats[]> {
    const response = await this.connector.get<{signedUrl: string}>(
      "/projects/" + projectId + "/testRuns/" + testRunId + "/errors",
    );
    try {
      const ERROR_MESSAGE_ERROR_STATS = "Error fetching error stats";
      const ZIP_DATA_FILE_NAME = "error-stats.json";
      if(response.code !== 200 || !response.data.signedUrl) throw Error(ERROR_MESSAGE_ERROR_STATS);
      return JSON.parse(await downloadAndReadZip(response.data.signedUrl, ZIP_DATA_FILE_NAME));
    }catch(e){
      console.error(e);
    }
  }

  async getNetworkMetrics(
      projectId: string,
      testRunId: string,
      diagnosticId: string
  ) {
    const response = await this.connector.get(
        `/projects/${projectId}/diagnostic/${testRunId}/${diagnosticId}`,
    );

    try {
      const ERROR_MESSAGE_DIAGNOSTICS = "Error fetching diagnostics";

      if(response.code !== 200 || !response.data) throw Error(ERROR_MESSAGE_DIAGNOSTICS);

      return response.data
    }catch(e){
      console.error(e);
    }
  }

  async getScriptsSteps(
    projectId: string,
    testRunId: string
  ): Promise<ScriptsSteps> {
    const response = await this.connector.get<ScriptsSteps>(
        "/projects/" + projectId + "/testRuns/" + testRunId + "/scripts/steps",
    );

    try {
      const ERROR_MESSAGE_SCRIPTS_STATS = "Error fetching scripts steps";

      if(response.code !== 200 || !response.data) throw Error(ERROR_MESSAGE_SCRIPTS_STATS);

      return response.data
    }catch(e){
      console.error(e);
    }
  }
}

export default TestRunService;
