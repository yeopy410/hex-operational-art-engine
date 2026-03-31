"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
const [X, Y] = [0, 1];



export class DataObject {
  /**
   * @param {import('./setting.js').IMapSetting} setting
   * @param {SVGGElement} layer 
   */
  constructor(setting, layer) {
    this.setting = setting;
    this.layer = layer;
    /** @type {import('./_hex.js').IHexUI[]} */
    this.hexUIArray = [];
    /** @type {string[]} */
    this.hexTextureList = [];
  }
}



/** @param {DataObject} data */
export function clearHexMap(data) {
  data.hexUIArray = [];
  data.layer.innerHTML = '';
}



/**
 * @param {DataObject} data
 * @param {string[]} textureList
 */
export function setHexTextureList(data, textureList) {
  data.hexTextureList = textureList;

  for (const hexUI of data.hexUIArray) {
    hexUI.setColor(data.hexTextureList[hexUI.terrain]);
  }

}



/**
 * @param {DataObject} data
 * @param {number[]} mapSize
 * @param {number[]} hexArray
 */
export function setHexMap(data, mapSize, hexArray) {
  const reference = [0, 0];
  const calcVectorFromCoordinate = Coordinate.createCalcVectorFromCoordinate(reference, data.setting.gridSize);

  const fragment = document.createDocumentFragment();
  let i = 0;
  for (let y = 0; y < mapSize[X]; y += 1) {
    for (let x = 0; x < mapSize[Y]; x += 1) {
      const hex = new HexUI(i, [x, y], hexArray[i])
        .setVector(calcVectorFromCoordinate([x, y]))
        .setColor(data.hexTextureList[hexArray[i]]);
      data.hexUIArray.push(hex);
      fragment.append(hex.svg);
      i += 1;
    }
  }

  data.layer.append(fragment);
}



export function updateHex() {

}



// 여기에 타일 하이라이트(에디터에서 필요) 기능도 추가? 지형 레이어와 하이라이트 레이어 분리 or 기존타일 조작? 



/** @typedef {HexUI} IHexUI */
class HexUI {
  /**
   * @param {number} index
   * @param {number[]} coordinate
   * @param {number} terrain
   */
  constructor(index, coordinate, terrain) {
    this.index = index;
    this.coordinate = coordinate;
    this.terrain = terrain;
    this.svg = DOM.buildSVG('use').setAttribute('href', '#hex-polygon').build();
  }


  /** @param {number[]} vector */
  setVector(vector) {
    this.svg.setAttribute('x', vector[X].toString());
    this.svg.setAttribute('y', vector[Y].toString());
    return this;
  }

  /** @param {string} color */
  setColor(color) {
    this.svg.setAttribute('fill', color);
    return this;
  }

}