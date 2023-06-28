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
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
app.whenReady().then(() => {
  ipcMain.handle("dialog", async (event, method, params) => {
    const result = await dialog[method](params);
    if (result) {
      const filePath = result["filePaths"][0].toString();
      console.log(filePath);
      try {
        const data = fs.readFileSync(filePath, "utf8");
        return { path: filePath, data: data.toString() };
      } catch (error) {
        console.log(error);
        return;
      }
    }
  });
  createWindow();
});
