import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";
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
  const mainUrl = process.env.FRONTEND_URL || "http://localhost:5173";

  let teams = [] as Team[];

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

  let stoppedClock = false;
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
  });

  clockWindow = new BrowserWindow({
    title: "Clock window",
    width: 500,
    height: 500,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
    autoHideMenuBar: false,
  });
  clockWindow.loadURL(`${mainUrl}/clock`);

  ipcMain.on("open-clock", (event) => {
    clockWindow = new BrowserWindow({
      title: "Clock window",
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

      if (!stoppedClock) {
        teams = mainTeams;
      }

      browserWindow.webContents.send("start-clock", { start: true });
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

  ipcMain.on("restart", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    teams = [];
    stoppedClock = false;

    clockWindow.webContents.send("restart");

    return (event.returnValue = "teams setted");
  });

  ipcMain.on("newRound", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    const resetedTeams = teams.map((team) => ({
      ...team,
      spentTime: 0,
      points: 0,
    }));

    teams = resetedTeams;

    clockWindow.webContents.send("set-teams", { teams: resetedTeams });
    clockWindow.webContents.send("newRound", true);
    browserWindow.webContents.send("set-teams", { teams: resetedTeams });

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

  ipcMain.on("getTimeOnKingSite", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }
    const king = teams[0];
    clockWindow.webContents.send("getTimeOnKingSite", {
      color: king.teamColor,
    });

    return (event.returnValue = "getTimeOnKingSite");
  });

  ipcMain.on(
    "setTeamTimeOnKingSite",
    (event, { color, spentTime }: { color: string; spentTime: number }) => {
      console.log("setTeamTimeOnKingSite", color, spentTime);
      const team = teams.find((team) => team.teamColor === color);
      const index = teams.findIndex((team) => team.teamColor === color);
      team.spentTime = (team.spentTime ?? 0) + spentTime;
      console.log("team", team, index);
      teams[index] = team;
      browserWindow.webContents.send("set-teams", { teams });
      return (event.returnValue = "time setted");
    },
  );

  ipcMain.on(
    "set-clock",
    (event, { minutes, seconds }: { minutes: number; seconds: number }) => {
      if (!clockWindow) {
        return (event.returnValue = "clock not opened");
      }

      browserWindow.webContents.send("set-clock", { minutes, seconds });
      clockWindow.webContents.send("set-clock", { minutes, seconds });

      return (event.returnValue = "clock setted");
    },
  );

  ipcMain.on("stop-clock", (event) => {
    if (!clockWindow) {
      return (event.returnValue = "clock not stopped");
    }
    stoppedClock = true;
    browserWindow.webContents.send("stop-clock", true);
    clockWindow.webContents.send("stop-clock", true);

    return (event.returnValue = "clock stopped");
  });

  ipcMain.on("remove-team", (event, color: string) => {
    console.log("teams1232131", teams);
    teams = teams.filter((team) => team.teamColor !== color);

    browserWindow.webContents.send("set-teams", { teams });
    clockWindow.webContents.send("set-teams", { teams });

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

  ipcMain.on("newPretendent", (event) => {
    const king = teams.shift() as Team;
    const currentPretendent = teams.shift() as Team;
    const newTeams = [king, ...teams, currentPretendent];

    teams = newTeams;

    if (!clockWindow) {
      return (event.returnValue = "clock not opened");
    }

    clockWindow.webContents.send("set-teams", { teams: newTeams });
    browserWindow.webContents.send("set-teams", { teams: newTeams });

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
    browserWindow.webContents.send("set-teams", { teams: newTeams });

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
