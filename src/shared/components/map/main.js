"use strict";
import * as DOM from '../../utils/dom.js';
import * as Viewport from './_viewport.js';
import * as Hex from './_hex.js';
import * as Unit from './_unit.js';



export const viewport = Viewport.body;
const svg = DOM.buildSVG('svg').addClassList('map-viewport-svg').build();
const svgDefs = DOM.buildSVG('defs').build();
const svgLayers = DOM.buildSVG('g').addClassList('map-layer').build();

const decorationLayer = DOM.buildSVG('g').build(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js?
const interactionLayer = DOM.buildSVG('g').build(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js?

// export (화면 유닛이나 타일 관련 이벤트 핸들러 걸 수 있는 곳).



void (function main() {
  svgDefs.append(Hex.hexPolygon);
  svgLayers.append(Hex.layer, decorationLayer, interactionLayer);
  svg.append(svgDefs, svgLayers);
  viewport.append(svg, Unit.layer);

  Unit.test();
  Unit.addEventListenerUnitUI('click', target => console.log(target.key));
  performFrame();

  viewport.addEventListener
  viewport.addEventListener
  viewport.addEventListener
})();



function performFrame() {
  Viewport.performTransform();
  requestAnimationFrame(performFrame);
}



/** @param {import('../../types/communication.js').InitDataMap} initDataMap */
export function init(initDataMap) {
  Hex.clearHexMap();
  Hex.setHexTextureList(initDataMap.initDataMapHex.terrainList);
  Hex.setHexMap(initDataMap.size, initDataMap.initDataMapHex.hexArray);
}



export function update(updateDataMap) {

}