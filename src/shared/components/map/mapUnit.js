"use strict";
import { template, div } from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';



const unitTemplate = template(
  div('map-unit-symbol',
    div('map-unit-symbol-img')
  ),
  div('map-unit-data',
    div('map-unit-data-cp'),
    div('map-unit-data-mp')
  )
);
export const unitContainer = document.createElement('div');
let mapSize = [0, 0];

// const reference = Vector2.add([Setting.GRID_SIZE[X], Setting.GRID_SIZE[Y]*2], Vector2.scalarMul(Setting.UNIT_SIZE, -0.5));



void (function main() {
  addEventListener('click', click);
  addEventListener('mouseover', mouseover);


  /** @param {MouseEvent} e */
  function click(e) {
    if (e.target instanceof UnitUI) {
      
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

// const reference = Vector2.scalarMul(unitSize, -0.5);
// const getVectorByCoordinate = Coordinate.createGetVectorByCoordinate(reference, gridSize);



export class UnitUI extends HTMLElement {
  constructor() {
    super();
    this.classList.add('map-unit');
    this.append(unitTemplate.content.cloneNode(true));
  }

}
customElements.define('map-unit', UnitUI);