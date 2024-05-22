import JSZip = require("jszip");

const ERROR_MESSAGE_ZIP = "Zip download error";

export const downloadAndReadZip = async (url: string, fileName: string) => {
    const response = await fetch(url);

    if(response.status !== 200 && response.status !== 0)
        throw new Error(response.statusText);
    
    const zip = await JSZip.loadAsync(await response.arrayBuffer());
    
    if(!zip) throw new Error(ERROR_MESSAGE_ZIP);
    
    return await zip.file(fileName)?.async("string");
};