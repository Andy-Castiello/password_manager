const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

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
        result = await dialog["showOpenDialog"]({
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
        }
        break;
      case "save":
        try {
          fs.writeFileSync(config["fileName"], config["data"]);
          return "success";
        } catch (error) {
          return "error";
        }
      case "saveAs":
        result = await dialog["showSaveDialog"]({
          defaultPath: config.fileName,
          filters: [{ name: "Passwords Data", extensions: ["pass"] }],
          properties: ["saveFile"],
        });
        if (!result["canceled"]) {
          const filePath = result["filePath"].toString();
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

        break;
      default:
        return;
    }
  });
  createWindow();
});
