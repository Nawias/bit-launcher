const { app, BrowserWindow} = require('electron')
const fs = require('fs');

function createWindow () {
  // Stwórz okno przeglądarki.
  const win = new BrowserWindow({
    title: "BiT Launcher",
    icon: "./build/icon.ico",
    width: 800,
    height: 600,
    backgroundColor: '#343a40ff',
    transparent: true,
    center: true,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      devTools: false,
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
