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

  const test = new UnitStackUI(1).setVector(calcVectorFromCoordinate([1, 1]));
  test.style.setProperty('--background-color', 'blue');
  test.style.setProperty('--unit-data-count', `'15'`);
  test.style.setProperty('--unit-data-force', `'17'`);

  const test2 = new UnitStackUI(2).setVector(calcVectorFromCoordinate([3, 2]));
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
 * @param {(target: UnitStackUI) => void} handler
 */
export function addEventListenerUnitStackUI(type, handler) {
  addEventListener(type, e => {
    if (e.target instanceof UnitStackUI) {
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



export function updateUnitStack(updateDataMapUnit) {

}



class UnitStackUI extends HTMLElement {
  static _template = DOM.template(
    DOM.div('map-unit-stack-symbol-img'),
    DOM.div('map-unit-stack-data-count'),
    DOM.div('map-unit-stack-data-force')
  );


  /** @param {Number} key  */
  constructor(key) {
    super();
    this.append(UnitStackUI._template.content.cloneNode(true));
    this.key = key
  }


  /** @param {Number[]} vector */
  setVector(vector) {
    this.style.setProperty('--unit-x', `${vector[X]}px`);
    this.style.setProperty('--unit-y', `${vector[Y]}px`);
    return this;
  }

}
customElements.define('map-unit-stack', UnitStackUI);