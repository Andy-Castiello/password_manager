const { app, BrowserWindow, dialog, ipcMain, clipboard } = require("electron");
const fs = require("fs");
const path = require("path");

const createWindow = (win) => {
  win.loadFile("./build/index.html");
};
const configDataPath = app.getPath("documents") + "/Password_Manager/data.dat";
const createConfigData = (configDataPath, filePath) => {
  if (!fs.existsSync(path.dirname(configDataPath))) {
    fs.mkdirSync(path.dirname(configDataPath));
  }
  fs.writeFileSync(configDataPath, JSON.stringify({ lastPath: filePath }));
};
app.on("window-all-closed", () => {
  app.quit();
});
app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("fileManagement", async (event, method, config) => {
    let lastPath = "";
    let result;
    switch (method) {
      case "open":
        if (fs.existsSync(configDataPath)) {
          try {
            lastPath = JSON.parse(fs.readFileSync(configDataPath, "utf8"))[
              "lastPath"
            ];
          } catch (error) {
            console.log(error);
          }
        }
        lastPath = lastPath ? path.dirname(lastPath) : app.getPath("documents");
        result = await dialog["showOpenDialog"](win, {
          defaultPath: lastPath,
          filters: [{ name: "Passwords Data", extensions: ["pass"] }],
          properties: ["openFile"],
        });
        if (!result["canceled"]) {
          const filePath = result["filePaths"][0].toString();
          try {
            const data = fs.readFileSync(filePath, "utf8");
            if (data) {
              createConfigData(configDataPath, filePath);
              return { path: filePath, data: data.toString() };
            } else {
              return { path: "", data: "" };
            }
          } catch (error) {
            console.log(error);
            return;
          }
        } else {
          return { path: "", data: "" };
        }
      case "save":
        console.log(config["fileName"]);
        if (config["fileName"]) {
          try {
            fs.writeFileSync(config["fileName"], config["data"]);
            return "success";
          } catch (error) {
            return "error";
          }
        }
      case "saveAs":
        if (fs.existsSync(configDataPath)) {
          try {
            lastPath = JSON.parse(fs.readFileSync(configDataPath, "utf8"))[
              "lastPath"
            ];
          } catch (error) {
            console.log(error);
          }
        }
        lastPath = lastPath ? path.dirname(lastPath) : app.getPath("documents");
        result = await dialog["showSaveDialog"](win, {
          defaultPath: config.fileName ? config.fileName : lastPath,
          filters: [{ name: "Passwords Data", extensions: ["pass"] }],
          properties: ["saveFile"],
        });
        if (!result["canceled"]) {
          let filePath = result["filePath"].toString();
          if (!filePath.match(/\.pass$/)) filePath += ".pass";
          try {
            fs.writeFileSync(filePath, config["data"]);
            createConfigData(configDataPath, filePath);
            return "success";
          } catch (error) {
            console.log(error);
            return "error";
          }
        } else {
          return "canceled";
        }

      default:
        return;
    }
  });
  ipcMain.handle("clipboard", (event, text) => {
    clipboard.writeText(text);
  });
  createWindow(win);
});
