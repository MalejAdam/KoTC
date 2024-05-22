import React, {useRef, useState} from "react";
import { ThemeProvider, Typography } from "@mui/material";

import { Snackbar } from "@src/components/Snackbar";
import { SnackbarData } from "@src/types/snackbar";
import { theme } from "@src/theme/muiTheme.ts";

const { ipcRenderer } = window.require("electron");

type UrlParams = {
  baseUrl: string;
  accountId: string;
  apiKey: string;
  projectId: string;
  testRunId: string;
  scenarioId: string;
  showPGForm: boolean;
};

// TODO: AFTER APPLICATION IS LOADED WE HAVE TO GET THE SCENARIO DATA FROM THE SERVER
// IF THE SCENARIO DOES NOT HAVE STEPS WE HAVE TO GRAB THEM FROM SCRIPTS AND SAVE THEM TO THE SCENARIO
// APP SHOULD BE A WRAPPER AND WE HAVE TO CREATE TO SEPARATE COMPONENTS

const Clock: React.FC = () => {
  const  [isLoading, setIsLoading] = useState(true);
  const  [isClockStart, setIsClockStart] = useState(false);

  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef<any>();

  // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e: string) => {
    const total =
        Date.parse(e) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor(
        (total / 1000 / 60) % 60
    );
    const hours = Math.floor(
        (total / 1000 / 60 / 60) % 24
    );
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: string) => {
    let { total, hours, minutes, seconds } =
        getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      setTimer(
          (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9
              ? minutes
              : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const stopTimer = () => {
    clearInterval(Ref.current);
  };

  const clearTimer = (e: string) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    if(timer === "00:00:00") {
      setTimer("00:15:00");
    }

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      startTimer(e);
    }, 1000);

    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    const timerDivided = timer.split(":");
    const minutes = parseInt(timerDivided[1]);
    const seconds = parseInt(timerDivided[2]);

    if(minutes === 0 && seconds === 0) {
      // This is where you need to adjust if
      // you entend to add more time
      deadline.setSeconds(deadline.getSeconds() + 900);
      return deadline.toString();
    }

    deadline.setMinutes(deadline.getMinutes() + minutes);
    deadline.setSeconds(deadline.getSeconds() + seconds);
    return deadline.toString();
  };

  React.useEffect(() => {
    ipcRenderer.on('start-clock', (_event: Event, arg: boolean) => {
      console.log("start-clock");
      setIsClockStart(arg);
    });

    ipcRenderer.on('stop-clock', (_event: Event, arg: boolean) => {
      setIsClockStart(false)
      stopTimer();
    });

    ipcRenderer.on('set-clock', (_event: Event, { minutes, seconds }: { minutes: number, seconds: number }) => {
      setTimer(`00:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
    });

    return () => {
      ipcRenderer.removeAllListeners('isLoading');
    };
  }, []);

  React.useEffect(() => {
    if(isClockStart) {
      clearTimer(getDeadTime());
    }
  }, [isClockStart]);

  return (
    <ThemeProvider theme={theme}>
      To jest drugie okno
      <h3>Countdown Timer Using React JS</h3>
      <h2>{timer}</h2>
    </ThemeProvider>
  );
};

export default Clock;
