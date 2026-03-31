"use strict";

/**
 * @typedef {Object} IMapSetting
 * @property {number} scaleDeltaMul
 * @property {number} scaleMin
 * @property {number} scaleMax
 * @property {number[]} gridSize
 * @property {number} hexBorder
 * @property {number[]} unitSize
 * @property {number} unitBorder
 */

/** @type {IMapSetting} */
export const map = {
  scaleDeltaMul: 0.00075,
  scaleMin: 0.1, scaleMax: 1,
  gridSize: [70, 40], // [40*2*Math.sqrt(3) /2, 160 /4].map(Math.round)
  hexBorder: 0.5,
  unitSize: [100, 100],
  unitBorder: 2
}
// setting을 여기서 상수로 관리하지 말고, main.js에서 map-viewport 컴포넌트 만들때 인수로 받기?
// default-setting으로 이름 바꾸고 shared/에 두기?