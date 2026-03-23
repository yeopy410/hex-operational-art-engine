"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];



export function test() {
  const reference = Vector2.sum([
    [Setting.GRID_SIZE[X], Setting.GRID_SIZE[Y]*2],
    Vector2.scalarMul(Setting.UNIT_SIZE, -0.5),
    [-Setting.UNIT_BORDER, -Setting.UNIT_BORDER]
  ])
  const getVectorByCoordinate = Coordinate.createGetVectorByCoordinate(reference, Setting.GRID_SIZE);

  const test = new UnitStackUI().setVector(getVectorByCoordinate([1, 1]));
  test.style.setProperty('--background-color', 'blue');
  test.style.setProperty('--unit-data-cp', `'15'`);
  test.style.setProperty('--unit-data-mp', `'17'`);

  const test2 = new UnitStackUI().setVector(getVectorByCoordinate([3, 2]));
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



void (function main() { // 이것들 전부 main으로 재배치하기?
  addEventListener('click', click);
  addEventListener('mouseover', mouseover);


  /** @param {MouseEvent} e */
  function click(e) {
    if (isUnitStackUI(e.target)) {
      console.log(e.target.name);
    }
  }

  /** @param {MouseEvent} e */
  function mouseover(e) {
    if (isUnitStackUI(e.target)) {
      
    }
  }

})();



/**
 * @param {Number[]} mapSizeData
 */
export function init(mapSizeData, initDataMapUnit) {
  mapSize = mapSizeData;
}



export function update(updateDataMapUnit) {

}



/**
 * @param {EventTarget | null} target
 * @returns {target is UnitStackUI}
 */
export function isUnitStackUI(target) {
  return target instanceof UnitStackUI;
}



class UnitStackUI extends HTMLElement {
  static _template = DOM.template(
    DOM.div('map-unit-symbol-img'),
    DOM.div('map-unit-data-cp'),
    DOM.div('map-unit-data-mp')
  );


  constructor() {
    super();
    this.append(UnitStackUI._template.content.cloneNode(true));
    this.name = 412414
  }


  /** @param {Number[]} vector */
  setVector(vector) {
    this.style.setProperty('--unit-x', `${vector[X]}px`);
    this.style.setProperty('--unit-y', `${vector[Y]}px`);
    return this;
  }

}
customElements.define('map-unit', UnitStackUI);