"use strict";
import * as DOM from '../../utils/dom.js';
import * as Viewport from './_viewport.js';
import * as Hex from './_hex.js';
import * as Unit from './_unit.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];



export class MapUI extends HTMLElement {
  #viewportData;
  #hexData;
  #unitData;


  /** @param {Setting.IMapSetting} setting  */
  constructor(setting=Setting.map) {
    super();
    const tree = createMapUITree(setting);
    this.append(tree.root);

    this.#viewportData = new Viewport.DataObject(setting, this);
    this.#hexData = new Hex.DataObject(setting, tree.hexLayer);
    this.#unitData = new Unit.DataObject(setting, tree.unitLayer);

    Viewport.startHandling(this.#viewportData);
    Unit.test(this.#unitData);
  }


  /** @param {import('../../types/communication.js').InitDataMap} initDataMap */
  init(initDataMap) {
    Hex.clearHexMap(this.#hexData);
    Hex.setHexTextureList(this.#hexData, initDataMap.terrainList);
    Hex.setHexMap(this.#hexData, initDataMap.size, initDataMap.hexArray);
  }

  update(updateDataMap) {

  }


  /**
   * @param {number} button
   * @param {(ctx: import('./_viewport.js').MousedownHandlerCtx) => void} handler
   */
  addMousedownHandler(button, handler) {
    let handlerSet = this.#viewportData.MousedownHandlerSetMap.get(button);
    if (handlerSet == null) {
      handlerSet = new Set();
      this.#viewportData.MousedownHandlerSetMap.set(button, handlerSet);
    }
    handlerSet.add(handler);
  }

  /**
   * @param {(ctx: import('./_viewport.js').MousemoveHandlerCtx) => void} handler
   */
  addMousemoveHandler(handler) {
    this.#viewportData.mousemoveHandlerSet.add(handler);
  }


  performTransform() {
    Viewport.performTransform(this.#viewportData);
  }


  resize([width, height]) {
    this.style.width  = `${width}px`;
    this.style.height = `${height}px`;
  }

}
customElements.define('map-viewport', MapUI);



/** @param {Setting.IMapSetting} setting */
function createMapUITree(setting) {
  const hexPolygon = DOM.buildSVG('polygon')
    .setAttribute('id', 'hex-polygon')
    .setAttribute('points', calcPoints(setting.hexBorder, setting.gridSize))
    .build();
  const svgDefs = DOM.buildSVG('defs').append(hexPolygon).build();

  const hexLayer = DOM.buildSVG('g').build();
  const decorationLayer = DOM.buildSVG('g').build(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js? z-index 설정필요.
  const interactionLayer = DOM.buildSVG('g').build(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js? z-index 설정필요.
  const svgLayers = DOM.buildSVG('g')
    .addClassList('map-layer')
    .append(hexLayer, decorationLayer, interactionLayer)
    .build();
  const svg = DOM.buildSVG('svg').addClassList('map-viewport-svg').append(svgDefs, svgLayers).build();

  const unitLayer = DOM.buildHTML('div')
    .addClassList('map-layer')
    .setProperty('--unit-size-x', `${setting.unitSize[X]}px`)
    .setProperty('--unit-size-y', `${setting.unitSize[Y]}px`)
    .setProperty('--unit-border-width', `${setting.unitBorder}px`)
    .setProperty('--unit-border-color', 'black')
    .build();

  const documentFragment = document.createDocumentFragment();
  documentFragment.append(svg, unitLayer);

  return {
    root: documentFragment,
    hexLayer: hexLayer,
    decorationLayer: decorationLayer,
    interactionLayer: interactionLayer,
    unitLayer: unitLayer
  }
}



/**
 * @param {number} border
 * @param {number[]} gridSize
 */
function calcPoints(border, gridSize) {
  const b = border;
  const [x, y] = gridSize;
  const sin30 = 1/2;
  const cos30 = Math.sqrt(3)/2;

  const [xl, xc, xr] = [b*cos30, x, x*2-b*cos30];
  const [yt, ymt, ymb, yb] = [b, y+b*sin30, y*3-b*sin30, y*4-b];

  return [
    [xc, yt ],
    [xr, ymt],
    [xr, ymb],
    [xc, yb ],
    [xl, ymb],
    [xl, ymt]
  ].map(point => `${point[X]},${point[Y]}`).join(' ');
}