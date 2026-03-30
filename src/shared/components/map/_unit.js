"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];



export function test() {
  const reference = Vector2.delta(
    Vector2.add(
      Vector2.scalarMul(Setting.UNIT_SIZE, 0.5),
      [Setting.UNIT_BORDER, Setting.UNIT_BORDER]
    ),
    [Setting.GRID_SIZE[X], Setting.GRID_SIZE[Y]*2]
  );
  const calcVectorFromCoordinate = Coordinate.createCalcVectorFromCoordinate(reference, Setting.GRID_SIZE);

  const test = new UnitUI(1).setVector(calcVectorFromCoordinate([1, 1]));
  test.style.setProperty('--background-color', 'blue');
  test.style.setProperty('--unit-data-attack', `'15'`);
  test.style.setProperty('--unit-data-defense', `'17'`);

  const test2 = new UnitUI(2).setVector(calcVectorFromCoordinate([3, 2]));
  test2.style.setProperty('--background-color', 'red');

  layer.append(test, test2);
}



export const layer = DOM.buildHTML('div')
  .setClassList('map-layer')
  .setProperty('--unit-size-x', `${Setting.UNIT_SIZE[X]}px`)
  .setProperty('--unit-size-y', `${Setting.UNIT_SIZE[Y]}px`)
  .setProperty('--unit-border-width', `${Setting.UNIT_BORDER}px`)
  .setProperty('--unit-border-color', 'black')
  .get();
let mapSize = [0, 0];



/**
 * @param {String} type
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
 * @param {Number[]} mapSizeData
 */
export function init(mapSizeData, initDataMapUnit) {
  mapSize = mapSizeData;
}



export function updateUnit(updateDataMapUnit) {

}



class UnitUI extends HTMLElement {
  static _template = DOM.template(
    DOM.div('map-unit-symbol-img'),
    DOM.div('map-unit-data-attack'),
    DOM.div('map-unit-data-defense')
  );


  /** @param {Number} key  */
  constructor(key) {
    super();
    this.append(UnitUI._template.content.cloneNode(true));
    this.key = key
  }


  /** @param {Number[]} vector */
  setVector(vector) {
    this.style.setProperty('--unit-x', `${vector[X]}px`);
    this.style.setProperty('--unit-y', `${vector[Y]}px`);
    return this;
  }

}
customElements.define('map-unit', UnitUI);