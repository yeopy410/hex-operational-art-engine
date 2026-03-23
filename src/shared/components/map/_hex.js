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

/** @type {HexUI[]} */
let hexUIArray = [];
/** @type {String[]} */
let hexTextureList = [];



export function clearHexMap() {
  hexUIArray = [];
  layer.innerHTML = '';
}



/** @param {String[]} textureList */
export function setHexTextureList(textureList) {
  hexTextureList = textureList;

  for (const hexUI of hexUIArray) {
    hexUI.setColor(hexTextureList[hexUI.terrain]);
  }

}



/**
 * @param {Number[]} mapSize
 * @param {Number[]} hexArray
 */
export function setHexMap(mapSize, hexArray) {
  const reference = [0, 0];
  const getVectorByCoordinate = Coordinate.createGetVectorByCoordinate(reference, Setting.GRID_SIZE);

  const fragment = document.createDocumentFragment();
  let i = 0;
  for (let y = 0; y < mapSize[X]; y += 1) {
    for (let x = 0; x < mapSize[Y]; x += 1) {
      const hex = new HexUI(i, [x, y], hexArray[i])
        .setVector(getVectorByCoordinate([x, y]))
        .setColor(hexTextureList[hexArray[i]]);
      hexUIArray.push(hex);
      fragment.append(hex.svg);
      i += 1;
    }
  }

  layer.append(fragment);
}



export function updateHex() {

}



// 여기에 타일 하이라이트(에디터에서 필요) 기능도 추가? 지형 레이어와 하이라이트 레이어 분리 or 기존타일 조작? 



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
   * @param {Number} terrain
   */
  constructor(index, coordinate, terrain) {
    this.index = index;
    this.coordinate = coordinate;
    this.terrain = terrain;
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