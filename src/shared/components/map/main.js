"use strict";
import * as DOM from '../../utils/dom.js';
import * as Viewport from './viewport.js';
import * as MapHex from './mapHex.js';
import * as MapUnit from './mapUnit.js';



export const viewport = Viewport.body;
const svg = DOM.buildSVG('svg').setClassList('map-viewport-svg').get();
const svgDefs = DOM.buildSVG('defs').get();
const svgLayers = DOM.buildSVG('g').setClassList('map-layer').get();

const decorationLayer = DOM.buildSVG('g').get(); // 이것들은 연결선 관련 모듈 따로 만들기 검토.
const interactionLayer = DOM.buildSVG('g').get(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 마우스오버시 타일 하이라이트도 MapHex 건들지 말고 여기서 처리?

// export (화면 유닛이나 타일 관련 이벤트 핸들러 걸 수 있는 곳).



void (function main() {
  svgDefs.append(MapHex.hexPolygon);
  svgLayers.append(MapHex.hexLayer, decorationLayer, interactionLayer);
  svg.append(svgDefs, svgLayers);
  viewport.append(svg, MapUnit.unitLayer);

  MapUnit.test();
})();



/** @param {import('../../types/communication.js').InitDataMap} initDataMap */
export function init(initDataMap) { // gridSize는 기본픽셀 크기. 타일이 [87px,100px]에 유닛 아이콘(카운터X)이 [45px, 30px]?
  MapHex.init(initDataMap);
}



export function update(updateDataMap) {

}