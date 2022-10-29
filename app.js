const { app, BrowserWindow, ipcMain } = require('electron');
const crash = (err) => { console.error(`\x1b[31m${err}\x1b[0m`); process.exit(1); };
const createWindow = () => {
    const win = new BrowserWindow({
        width: 650,
        minWidth: 600,
        height: 873,
        minHeight: 400,
        frame: false,
        darkTheme: true,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
            sandbox: false,
            spellcheck: false,
        }
    });
    win.loadFile('./src/www/index.html')
    .catch((err) => { crash(err); });
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
})
.catch((err) => { crash(err); });

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('close', () => {
    app.quit();
});

ipcMain.on('minimize', () => {
    BrowserWindow.getAllWindows()[0].minimize();
});

ipcMain.on('maximize', () => {
    if (BrowserWindow.getAllWindows()[0].isMaximized()) {
        BrowserWindow.getAllWindows()[0].unmaximize();
    } else {
        BrowserWindow.getAllWindows()[0].maximize();
    }
});