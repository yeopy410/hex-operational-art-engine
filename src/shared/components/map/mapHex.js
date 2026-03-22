"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];



export const hexPolygon = DOM.buildSVG('polygon')
  .setAttribute('id', 'hex-polygon')
  .setAttribute('points', getPoints())
  .get();
export const layer = DOM.buildSVG('g').get();
let hexUIArray = [];



void (function main() {

})();



/**
 * @param {import('../../types/communication.js').InitDataMap} initDataMap
 */
export function init(initDataMap) {
  clearHexMap();

  setHexMap(initDataMap.size, initDataMap.initDataMapHex);
}



export function update(updateDataMapHex) {

}



function clearHexMap() {
  hexUIArray = [];
  layer.innerHTML = '';
}



/**
 * @param {Number[]} mapSize
 * @param {import('../../types/communication.js').InitDataMapHex} initDataMapHex
 */
function setHexMap(mapSize, initDataMapHex) {
  const reference = [0, 0];
  const getVectorByCoordinate = Coordinate.createGetVectorByCoordinate(reference, Setting.GRID_SIZE);

  const fragment = document.createDocumentFragment();
  let i = 0;
  for (let y = 0; y < mapSize[X]; y += 1) {
    for (let x = 0; x < mapSize[Y]; x += 1) {
      const hex = new HexUI(i, [x, y])
        .setVector(getVectorByCoordinate([x, y]))
        .setColor(initDataMapHex.terrainList[initDataMapHex.hexArray[i]]);
      hexUIArray.push(hex);
      fragment.append(hex.svg);
      i += 1;
    }
  }

  layer.append(fragment);
}



function getPoints() {
  const p = Setting.HEX_BORDER;
  const [x, y] = Setting.GRID_SIZE;
  const sin30 = 1/2;
  const cos30 = Math.sqrt(3)/2;

  const [xl, xc, xr] = [p*cos30, x, x*2-p*cos30];
  const [yt, ymt, ymb, yb] = [p, y+p*sin30, y*3-p*sin30, y*4-p];

  return [
    [xc, yt ],
    [xr, ymt],
    [xr, ymb],
    [xc, yb ],
    [xl, ymb],
    [xl, ymt]
  ].map(point => `${point[X]},${point[Y]}`).join(' ');
}



class HexUI {
  /**
   * @param {Number} index
   * @param {Number[]} coordinate
   */
  constructor(index, coordinate) {
    this.index = index;
    this.coordinate = coordinate;
    this.svg = DOM.buildSVG('use').setAttribute('href', '#hex-polygon').get();
  }


  /** @param {Number[]} vector */
  setVector(vector) {
    this.svg.setAttribute('x', vector[X].toString());
    this.svg.setAttribute('y', vector[Y].toString());
    return this;
  }

  /** @param {String} color */
  setColor(color) {
    this.svg.setAttribute('fill', color);
    return this;
  }

}