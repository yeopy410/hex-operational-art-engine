"use strict";
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';



/**
 * @param {string} baseDir
 */
export function start(baseDir) {
  ipcMain.on('message', (event, arg) => {
    console.log(arg); // "ping" 메시지 출력
    event.reply('reply', arg);
  });

  app.whenReady().then(() => createWindow(baseDir));
}



/** @param {String} baseDir */
function createWindow(baseDir) {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(baseDir, 'apps', 'admin', 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadFile(path.join(baseDir, 'apps', 'admin', 'index.html'));
}