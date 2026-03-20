"use strict";
import * as Coordinate from '../../utils/coordinate.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];
const SVGNS = "http://www.w3.org/2000/svg";



export const hexPolygon = document.createElementNS(SVGNS, 'polygon');
export const hexGroup = document.createElementNS(SVGNS, 'g');
let hexUIArray = [];



void (function main() {
  hexPolygon.setAttribute('id', 'hex-polygon');
})();



/**
 * @param {import('../../types/communication.js').InitDataMap} initDataMap
 */
export function init(initDataMap) {
  hexPolygon.setAttribute('points', HexUI.getPointsByGridSize(Setting.GRID_SIZE)); // 여기에 추가로 타일간 유격도 고려할것? paddedGridSize?
  clearHexMap();

  setHexMap(initDataMap.size, initDataMap.initDataMapHex);
}



export function update(updateDataMapHex) {

}



function clearHexMap() {
  hexUIArray = [];
  hexGroup.innerHTML = '';
}



/**
 * @param {Number[]} mapSize
 * @param {import('../../types/communication.js').InitDataMapHex} initDataMapHex
 */
function setHexMap(mapSize, initDataMapHex) {
  const reference = [0, 0]; // 여기에 추가로 타일간 유격도 고려할것? padding?
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

  hexGroup.append(fragment);
}



class HexUI {
  /** @param {Number[]} gridSize */
  static getPointsByGridSize([x, y]) {
    return [
      [0  , y  ],
      [x  , 0  ],
      [x*2, y  ],
      [x*2, y*3],
      [x  , y*4],
      [0  , y*3]
    ].map(point => `${point[X]},${point[Y]}`).join(' ');
  }


  /**
   * @param {Number} index
   * @param {Number[]} coordinate
   */
  constructor(index, coordinate) {
    this.index = index;
    this.coordinate = coordinate;
    this.svg = document.createElementNS(SVGNS, 'use');
    this.svg.setAttribute('href', '#hex-polygon');
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