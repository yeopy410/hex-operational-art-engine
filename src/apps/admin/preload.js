"use strict";
const { contextBridge, ipcRenderer } = require('electron');



/** @typedef {ElectronAPI} IElectronAPI */

class ElectronAPI {
  constructor() {
    /** @param {any} data */
    this.sendMessage = data => {
      ipcRenderer.send('message', data);
    }

    /** @param {(data: any) => void} callback */
    this.onReply = callback => {
      ipcRenderer.on('reply', (event, data) => callback(data));
    }
  }
}

contextBridge.exposeInMainWorld('electronAPI', new ElectronAPI());