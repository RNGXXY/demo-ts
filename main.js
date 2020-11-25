const { app, BrowserWindow } = require('electron');

const path = require('path');

const pkg = require('./package.json');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,

    height: 600,

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  }); // 加载应用----react 打包 //mainWindow.loadURL(url.format({ //pathname: path.join(__dirname, './build/index.html'), //protocol: 'file:', //slashes: true //})) // 加载应用----适用于 react 项目和开发阶段npm run electron

  mainWindow.loadURL('http://localhost:8899/');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
