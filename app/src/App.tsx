import React from "react";
import { ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme/muiTheme";

import { Snackbar } from "@src/components/Snackbar";
import { SnackbarData } from "@src/types/snackbar";
import {SetTime} from "@src/components/SetTime.tsx";

const { ipcRenderer } = window.require("electron");

// TODO: AFTER APPLICATION IS LOADED WE HAVE TO GET THE SCENARIO DATA FROM THE SERVER
// IF THE SCENARIO DOES NOT HAVE STEPS WE HAVE TO GRAB THEM FROM SCRIPTS AND SAVE THEM TO THE SCENARIO
// APP SHOULD BE A WRAPPER AND WE HAVE TO CREATE TO SEPARATE COMPONENTS

const App: React.FC = () => {
  const  [isLoading, setIsLoading] = React.useState(true);

  const [snackbarData, setSnackbarData] = React.useState<SnackbarData>({ type: "info", showSnackBar: false, message: "" });

  const onClickOpenClock = async () => {
    await ipcRenderer.sendSync("open-clock");
  }

    const onClickStartClock = async () => {
        await ipcRenderer.sendSync("start-clock");
    }

    const onClickStopClock = async () => {
        await ipcRenderer.sendSync("stop-clock");
    }

  React.useEffect(() => {
    ipcRenderer.on('isLoading', (_event: Event, arg: boolean) => {
      setIsLoading(arg);
    });

    ipcRenderer.on('setSnackbar', (_event: Event, _snackbarData: SnackbarData) => {
      setSnackbarData(_snackbarData);
    });

    return () => {
      ipcRenderer.removeAllListeners('isLoading');
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={snackbarData.showSnackBar} type={snackbarData.type} onClose={() => setSnackbarData({...snackbarData, showSnackBar: false})}>
        <Typography paragraph>{snackbarData.message}</Typography>
      </Snackbar>
      Tutaj coś działa
      <button onClick={async () => {
        await onClickOpenClock()
        console.log("clikced")
      }}>
        otwórz clock
      </button>
      <button onClick={async () => {
        await onClickStartClock()
        console.log("started clock")
      }}>
        START
      </button>
        <button onClick={async () => {
            await onClickStopClock()
            console.log("stopped clock")
        }}>
            STOP
        </button>
        <SetTime />
    </ThemeProvider>
  );
};

export default App;
