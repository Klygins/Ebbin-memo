const electron = require("electron");
const {
  app,
  BrowserWindow,
  ipcMain,
  Notification,
  Tray,
  Menu
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;
let tray;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 620,
    height: 460,
    icon: './icon.ico',
    minWidth: 380,
    minHeight: 380,
    webPreferences: {
      backgroundThrottling: false,
      contextIsolation: false,
      preload: path.join(__dirname, 'electron-preload.js')
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.setMenu(null)

  mainWindow.on('minimize', function (event) {
    event.preventDefault();
    mainWindow.hide();
    tray = createTray();
  });

  mainWindow.on('restore', function (event) {
    mainWindow.show();
    tray.destroy();
  });

  if (isDev)
    mainWindow.webContents.openDevTools()

  return mainWindow
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
  const notif = new Notification({ title, body });
  notif.show();
}


function createTray() {
  let appIconTray = new Tray(path.join(__dirname, 'images', 'tray.png'));

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show', click: function () {
        mainWindow.show();
      }
    },
    {
      label: 'Exit', click: function () {
        app.isQuiting = true;
        app.quit();
      }
    }
  ]);

  appIconTray.on('click', (event) => {
    mainWindow.show();
  })

  appIconTray.setToolTip('Open Ebbin Memo');
  appIconTray.setContextMenu(contextMenu);
  return appIconTray;
}
