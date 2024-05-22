export class Translator {
  private folderPath: string;
  private outputFolderPath: string;
  private ipcRenderer: unknown;

  constructor(folderPath: string, outputFolderPath: string) {
    this.folderPath = folderPath;
    this.outputFolderPath = outputFolderPath;
    this.ipcRenderer = window.require("electron") as unknown;
  }

  public async handleTranslator(): Promise<void> {
    // TODO - Implement handleTranslator with types
    console.log("handleTranslator");
    console.log("folderPath", this.folderPath);
    console.log("outputFolderPath", this.outputFolderPath);
    console.log(typeof this.ipcRenderer);
    // const translation = await (this.ipcRenderer as object).invoke("translator-channel", {
    //   tcFileName: "TestProject_ScriptTranslator.mds",
    // });
    // return translation;
  }
}
