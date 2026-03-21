"use strict";
import * as DOM from '../../utils/dom.js';
import { template, div } from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];



export function test() {
  unitLayer.style.setProperty('--unit-size-x', `${Setting.UNIT_SIZE[X]}px`);
  unitLayer.style.setProperty('--unit-size-y', `${Setting.UNIT_SIZE[Y]}px`);
  const reference = Vector2.add([Setting.GRID_SIZE[X], Setting.GRID_SIZE[Y]*2], Vector2.scalarMul(Setting.UNIT_SIZE, -0.5));
  const getVectorByCoordinate = Coordinate.createGetVectorByCoordinate(reference, Setting.GRID_SIZE);
  const test = new UnitUI().setVector(getVectorByCoordinate([1, 1]));
  test.style.setProperty('--background-color', 'blue');
  unitLayer.append(test);
}

const unitTemplate = template(
  div('map-unit-symbol',
    div('map-unit-symbol-img')
  ),
  div('map-unit-data',
    div('map-unit-data-cp'),
    div('map-unit-data-mp')
  )
);
export const unitLayer = DOM.buildHTML('div').setClassList('map-layer').get();
let mapSize = [0, 0];



void (function main() {
  addEventListener('click', click);
  addEventListener('mouseover', mouseover);


  /** @param {MouseEvent} e */
  function click(e) {
    if (e.target instanceof UnitUI) {
      console.log(1);
    }
  }

  /** @param {MouseEvent} e */
  function mouseover(e) {
    if (e.target instanceof UnitUI) {
      
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



export class UnitUI extends HTMLElement {
  constructor() {
    super();
    this.classList.add('map-unit');
    this.append(unitTemplate.content.cloneNode(true));
  }

  /** @param {Number[]} vector */
  setVector(vector) {
    this.style.setProperty('--unit-x', `${vector[X]}px`);
    this.style.setProperty('--unit-y', `${vector[Y]}px`);
    return this;
  }

}
customElements.define('map-unit', UnitUI);