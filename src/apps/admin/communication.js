"use strict";

// @ts-ignore
/** @type {import('./preload.js').ElectronAPI} */ const api = window.electronAPI;



export function start() {
  console.log(api);
  api.onReply(data => {
    console.log(data);
  });
  api.sendMessage({str: 'ping'});
}