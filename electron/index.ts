import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  WebContentsView,
} from "electron";
import "dotenv/config";

export type Team = {
  player1: string;
  player2: string;
  teamColor?: string;
  startPosition?: number;
  spentTime: number;
  points?: number;
};

const createWindow = async () => {
  const isDev = process.env.APP_DEV === "true";
  const isBuildLocal = process.env.BUILD_LOCAL === "true";
  const mainUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const cmdArgsJson =
    isDev || isBuildLocal ? process.env.ARGS : process.argv[1];
  const {
    apiKey,
    accountId,
    showPGForm,
    scenarioId: _scenarioId,
    projectId: _projectId,
    testRunId: _testRunId,
  } = JSON.parse(String(cmdArgsJson));

  let teams = [] as Team[];

  if (!apiKey || !accountId) {
    console.error("Missing accountId or apiKey in the arguments");
    app.quit();
  }

  const browserWindow = new BrowserWindow({
    title: "LNV Modal",
    width: 1024,
    height: 800,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    autoHideMenuBar: false,
  });

  let clockWindow = null;

  globalShortcut.register("f5", function () {
    browserWindow.reload();
  });

  globalShortcut.register("CommandOrControl+R", function () {
    browserWindow.reload();
  });

  browserWindow.webContents.on("did-finish-load", () => {
    browserWindow.webContents.send("isLoading", false);
    //TODO: when electron backend implementation of translation is  finished we have to add event with flag change

    if (showPGForm && (!_scenarioId || !_projectId)) {
      browserWindow.webContents.send("setSnackbar", {
        type: "error",
        showSnackBar: true,
        message:
          'Please provide the "scenarioId" and "projectId" if you want to update the scenario',
      });
    }

    if (!showPGForm && (!_testRunId || !_projectId)) {
      browserWindow.webContents.send("setSnackbar", {
        type: "error",
        showSnackBar: true,
        message:
          'Please provide the "testRunId" and "projectId" if you want to view a testRun',
      });
    }
  });

  ipcMain.on("open-clock", (event) => {
    clockWindow = new BrowserWindow({
      title: "Testowy tekst",
      width: 500,
      height: 500,
      webPreferences: {
        contextIsolation: false,
        nodeIntegration: true,
      },
      autoHideMenuBar: false,
    });
    clockWindow.loadURL(`${mainUrl}/clock`);

    return (event.returnValue = "clock opened");
  });

  ipcMain.on(
    "start-clock",
    (event, { teams: mainTeams }: { teams: Team[] }) => {
      if (!clockWindow) {
        return (event.returnValue = "clock not opened");
      }

      teams = mainTeams;

      clockWindow.webContents.send("start-clock", { start: true, teams });

      return (event.returnValue = "clock started");
    },
  );

  ipcMain.on("setTeams", (event, { teams: mainTeams }: { teams: Team[] }) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    teams = mainTeams;

    clockWindow.webContents.send("set-teams", { teams: mainTeams });

    return (event.returnValue = "teams setted");
  });

  ipcMain.on("getTeamTimeOnKingSite", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }
    const lastKing = teams[teams.length - 1];
    clockWindow.webContents.send("getTeamTimeOnKingSite", {
      color: lastKing.teamColor,
    });

    return (event.returnValue = "getTeamTimeOnKingSite");
  });

  ipcMain.on(
    "setTeamTimeOnKingSite",
    (event, { color, spentTime }: { color: string; spentTime: number }) => {
      const team = teams.find((team) => team.teamColor === color);
      const index = teams.findIndex((team) => team.teamColor === color);
      team.spentTime = team.spentTime + spentTime;
      teams[index] = team;
      console.log("teams", teams);
      return (event.returnValue = "time setted");
    },
  );

  ipcMain.on(
    "set-clock",
    (event, { minutes, seconds }: { minutes: number; seconds: number }) => {
      if (!clockWindow) {
        return (event.returnValue = "clock not opened");
      }

      clockWindow.webContents.send("set-clock", { minutes, seconds });

      return (event.returnValue = "clock setted");
    },
  );

  ipcMain.on("stop-clock", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not stopped");
    }

    clockWindow.webContents.send("stop-clock", true);

    return (event.returnValue = "clock stopped");
  });

  ipcMain.on("pretendentToKing", (event) => {
    const king = teams.shift() as Team;
    const newTeams = [...teams];
    newTeams.push(king);

    teams = newTeams;

    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    clockWindow.webContents.send("set-teams", { teams: newTeams });

    return (event.returnValue = "clock stopped");
  });

  ipcMain.on("pointForKing", (event) => {
    const king = teams.shift() as Team;
    king.points = king.points ? king.points + 1 : 1;

    const newTeams = [king, ...teams];

    teams = newTeams;

    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    clockWindow.webContents.send("set-teams", { teams: newTeams });

    return (event.returnValue = "clock stopped");
  });

  ipcMain.on("close", () => app.quit());

  browserWindow.loadURL(mainUrl);
};

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
