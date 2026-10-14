"use strict";

/** @type {import('./main.js').IMapSetting} */
export const defaultMapUI = {
  scaleDeltaMul: 0.00075,
  scaleMin: 0.1, scaleMax: 1,
  gridSize: [70, 40], // [40*2*Math.sqrt(3) /2, 160 /4].map(Math.round)
  hexBorder: 0.5,
  unitSize: [100, 100],
  unitBorder: 2
}

// 이 파일 shared/에 두기?