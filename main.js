const { app, BrowserWindow } = require('electron')
const path = require('path')

let server = require('./app')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        icon: '/img/DRRlogo.png',
        webPreferences: {
            nodeIntegration: true
        }

    })

    win.loadURL('http://localhost:3000')
    win.on('closed', function () {
        BrowserWindow = null
    })
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
}
)

