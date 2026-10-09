import { app, BrowserWindow, ipcMain } from "electron";
import { readFile } from "node:fs/promises";
import path from "node:path";

function createWindow() {
    const window = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
        },
    });

    window.loadURL("http://localhost:5173");
    window.webContents.openDevTools();
}

ipcMain.handle("fusion-data:load", async () => {
    const filePath = path.join(
        app.getAppPath(),
        "data",
        "fusion-data.json",
    );

    const file = await readFile(filePath, "utf-8");

    return JSON.parse(file);
});

app.whenReady().then(() => {
    createWindow();
});