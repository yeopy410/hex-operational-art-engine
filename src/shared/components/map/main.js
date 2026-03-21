"use strict";
import * as Viewport from './viewport.js';
import * as MapHex from './mapHex.js';
import * as MapUnit from './mapUnit.js';
const SVGNS = "http://www.w3.org/2000/svg";



export const viewport = Viewport.body;
const svg = document.createElementNS(SVGNS, 'svg');
const svgDef = document.createElementNS(SVGNS, 'def');
const svgContainer = document.createElementNS(SVGNS, 'g');

const decorationGroup = document.createElementNS(SVGNS, 'g'); // 이것들은 연결선 관련 모듈 따로 만들기 검토.
const interactionGroup = document.createElementNS(SVGNS, 'g'); // 이것들은 연결선 관련 모듈 따로 만들기 검토.

// export (화면 유닛이나 타일 관련 이벤트 핸들러 걸 수 있는 곳).



void (function main() {
  viewport.classList.add('map-viewport');
  svg.classList.add('map-viewport-svg');
  svgContainer.classList.add('map-container');
  MapUnit.unitContainer.classList.add('map-container');

  svgDef.append(MapHex.hexPolygon);
  svgContainer.append(MapHex.hexGroup, decorationGroup, interactionGroup);
  svg.append(svgDef, svgContainer);
  viewport.append(svg, MapUnit.unitContainer);

  MapUnit.test();

  // viewport.addEventListener // [타일 마우스오버, 타일 클릭] 헨들링은 if (e.target is 타일) 방식 말고 기존의 마우스벡터 방식 그대로 유지하기?
})();



/** @param {import('../../types/communication.js').InitDataMap} initDataMap */
export function init(initDataMap) { // gridSize는 기본픽셀 크기. 타일이 [87px,100px]에 유닛 아이콘(카운터X)이 [45px, 30px]?
  MapHex.init(initDataMap);
}



export function update(updateDataMap) {

}