// Importing necessary modules and hooks from electron and react
const { ipcRenderer } = window.require('electron') as any;
import React, { useState } from 'react';
interface Translator {
  folderPath: string;
  outputFolderPath: string;
  errors: { message: string, code: number, stack: string }[];
}

//Demo purpose code to call the translator and utilize the data returned from translator
const TranslatorExecute: React.FC = () => {
    
    const [folderPath, setFolderPath] = useState<string>('');
    const [outputFolderPath, setOutputFolderPath] = useState<string>('');
    const [translatorMessage, setTranslatorMessage] = useState<string>('');

    //Function to call the translator
    const handleTranslator = async () => {

        // TODO: Currently hardcoded values for testing, in the future we will remove this and get the values on the electron
        const folderPath = "C:\\TestComplete\\LoadNinja\\tcln-plugin\\lnv-modal\\MyTcProjects\\TC_ScriptTranslator\\TestProject_ScriptTranslator\\";
        const fileName = "TestProject_ScriptTranslator.mds";
        const testName = "Test2";

        // TODO: We will remove this argument for the main translator class since we are going to translate the script on the fly without saving it.
        const outputFolderPath = "C:\\TestComplete\\LoadNinja\\tcln-plugin\\lnv-modal\\outputFolder\\";
        
        // Invoking the 'executeTranslation' channel in the main process with parameter testName, fileName and folderPat
        const translator: Translator = await ipcRenderer.sendSync("executeTranslation", { testName, fileName, folderPath, outputFolderPath });
        // Updating the state variables with the returned data from the translator
        setFolderPath(translator.folderPath);
        setOutputFolderPath(translator.outputFolderPath);
        if(translator.errors.length > 0) {
            const errors = translator.errors.reduce((acc: string, error: { message: string, code: number, stack: string }) => acc+error.message+"\n", "");
            //Actions to be taken if translator fails
            setTranslatorMessage("Translator Error: " + errors);
        }else{
            setTranslatorMessage("Translator Success");
        }
    }

    return (
        <div>
            <button onClick={() => handleTranslator()}>Exec Translator</button>
            <div>
                <span>{folderPath}</span><br/>
                <span>{outputFolderPath}</span><br/>
                <span>{translatorMessage}</span>
            </div>
        </div>
    );
}

export default TranslatorExecute;