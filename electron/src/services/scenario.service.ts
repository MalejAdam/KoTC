import { CreateScenarioBody, UpdateScenarioBody, Scenario } from "../types/scenario";
import { Connector } from "../utils/connector";

export class ScenarioService {
  connector: Connector;

  constructor(connector: Connector) {
    this.connector = connector;
  }

  async getScenarioList(projectId: string): Promise<Scenario[]> {
    const response = await this.connector.get<Scenario[]>(
      "/projects/" + projectId + "/scenarios"
    );
    return response.data;
  }

  public async getSingleScenario(
    projectId: string,
    scenarioId: string
  ): Promise<Scenario> {
    const response = await this.connector.get<Scenario>(
      "/projects/" + projectId + "/scenarios/" + scenarioId
    );
    return response.data;
  }

  async patchSingleScenario(
    projectId: string,
    scenarioId: string,
    data: UpdateScenarioBody
  ): Promise<Scenario> {
    const response = await this.connector.patch<Scenario>(
      "/projects/" + projectId + "/scenarios/" + scenarioId,
      data
    );
    return response.data;
  }

  async postSingleScenario(
    projectId: string,
    data: CreateScenarioBody
  ): Promise<Scenario> {
    const response = await this.connector.post<Scenario>(
      "/projects/" + projectId + "/scenarios",
      data
    );
    return response.data;
  }
}

export default ScenarioService;
