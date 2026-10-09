const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    loadFusionData: () => ipcRenderer.invoke("fusion-data:load"),
});