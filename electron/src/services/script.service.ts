// create a class to handle the script service it must import connector class and based on its functio-ns
import Connector from "../utils/connector";
import { Script } from "../types/script";

export class ScriptService {
  private connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  async getScriptList(projectId: string): Promise<Script[]> {
    const response = await this.connector.get<Script[]>(
      "/projects/" + projectId + "/scripts"
    );
    return response.data;
  }

  async getSingleSript(projectId: string, scriptId: string): Promise<Script> {
    const response = await this.connector.get<Script>(
      "/projects/" + projectId + "/scripts/" + scriptId
    );
    return response.data;
  }

  async patchSingleScript(
    projectId: string,
    scriptId: string,
    data: Script
  ): Promise<Script> {
    const response = await this.connector.patch<Script>(
      "/projects/" + projectId + "/scripts/" + scriptId,
      data
    );

    return response.data;
  }
}

export default ScriptService;
