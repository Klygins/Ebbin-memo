const electron = require("electron");
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 680,
    icon: '../public/icon.ico',
    minWidth: 380,
    minHeight: 380,
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload: __dirname + '\\electron-preload.js'
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

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

ipcMain.on('notify', (event, arg) => {
  sendNotification(arg.title, arg.body)
  mainWindow.webContents.send("fromMain", 'response');
})

function sendNotification(title, body) {
  new Notification({
    title, body
  }).show();
}