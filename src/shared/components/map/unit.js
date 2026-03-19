// @ts-check
"use strict";
import { template, div } from '../../utils/dom.js';
console.log(import.meta.url);



const unitTemplate = template(
  div('map-unit-symbol', 
    div('map-unit-symbol-img')
  ),
  div('map-unit-data', 
    div('map-unit-data-cp'),
    div('map-unit-data-mp')
  )
);



export class UnitUI extends HTMLElement {
  constructor() {
    super();
    this.classList.add('map-unit');
    this.append(unitTemplate.content.cloneNode(true));
  }

}
customElements.define('unit', UnitUI);