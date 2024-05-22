export type ScriptType = 'SRC' | 'SRC-API';
export type DatabanksType = 'Randomly';

export type Databank = {
  name: string ,
  rows: number,
}

export type Script = {
  virtualUsers: number,
  fileName: string,
  accountId: string,
  scriptPath: string, 
  hasPlayedBack: boolean,
  project: string,
  name: string,
  mappedDatabanks: Array<Databank>,
  stepNames: Array<string>,
  createDate: string,
  needsTunnel: boolean,
  relativePath: string,
  runDatabanks: DatabanksType | string,
  isAPI: boolean,
  scriptId: string,
  type: ScriptType | string,
  resolution?: {
    width: string,
    height: string
  },
  origUserId?: string, // email
  load?: any;
  scriptDescription?: string;
}
