const { app, BrowserWindow } = require("electron");

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "BiT Launcher",
    width: 800,
    height: 600,
    backgroundColor: "#343a40ff",
    transparent: true,
    center: true,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, "/../public/index.html"),
        protocol: "file:",
        slashes: true,
      })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
