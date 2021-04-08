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
    width: 620,
    height: 440,
    icon: './icon.ico',
    minWidth: 380,
    minHeight: 380,
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload:  path.join(__dirname , 'electron-preload.js')
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.setMenu(null)
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
})

function sendNotification(title, body) {
  new Notification({
    title, body
  }).show();
}