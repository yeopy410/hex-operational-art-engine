"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
const [X, Y] = [0, 1];



export class DataObject {
  /**
   * @param {import('./setting.js').IMapSetting} setting
   * @param {HTMLDivElement} layer 
   */
  constructor(setting, layer) {
    this.setting = setting;
    this.layer = layer;
  }
}



/** @param {DataObject} data */
export function test(data) {
  const calcVectorFromCoordinate = createCalcVectorFromCoordinate(data);

  const test = new UnitUI(1).setVector(calcVectorFromCoordinate([1, 1]));
  test.style.setProperty('--background-color', 'blue');
  test.style.setProperty('--unit-data-attack', `'15'`);
  test.style.setProperty('--unit-data-defense', `'17'`);

  const test2 = new UnitUI(2).setVector(calcVectorFromCoordinate([3, 2]));
  test2.style.setProperty('--background-color', 'red');

  data.layer.append(test, test2);
}



/**
 * 이거 지워서 유닛으로는 이벤트 받지 말고, 헥스 위치로 모든 마우스 입력 처리하기?
 * @param {string} type
 * @param {(target: UnitUI) => void} handler
 */
export function addEventListenerUnitUI(type, handler) {
  addEventListener(type, e => {
    if (e.target instanceof UnitUI) {
      handler(e.target);
    }
  });
}



/**
 * 
 */
export function setUnitMap(initDataMapUnit) {

}



export function updateUnit(updateDataMapUnit) {

}



/** @param {DataObject} data */
function createCalcVectorFromCoordinate(data) {
  const reference = Vector2.delta(
    Vector2.add(
      Vector2.scalarMul(data.setting.unitSize, 0.5),
      [data.setting.unitBorder, data.setting.unitBorder]
    ),
    [data.setting.gridSize[X], data.setting.gridSize[Y]*2]
  );
  return Coordinate.createCalcVectorFromCoordinate(reference, data.setting.gridSize);
}



class UnitUI extends HTMLElement {
  static #template = DOM.template(
    DOM.div('map-unit-symbol-img'),
    DOM.div('map-unit-data-attack'),
    DOM.div('map-unit-data-defense')
  );


  /** @param {number} key  */
  constructor(key) {
    super();
    this.append(UnitUI.#template.content.cloneNode(true));
    this.key = key;
  }


  /** @param {number[]} vector */
  setVector(vector) {
    this.style.setProperty('--unit-x', `${vector[X]}px`);
    this.style.setProperty('--unit-y', `${vector[Y]}px`);
    return this;
  }

}
customElements.define('map-unit', UnitUI);