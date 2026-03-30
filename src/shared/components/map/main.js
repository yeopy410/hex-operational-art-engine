"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Viewport from './_viewport.js';
import * as Hex from './_hex.js';
import * as UnitStack from './_unit-stack.js';



export const viewport = Viewport.body;
const svg = DOM.buildSVG('svg').setClassList('map-viewport-svg').get();
const svgDefs = DOM.buildSVG('defs').get();
const svgLayers = DOM.buildSVG('g').setClassList('map-layer').get();

const decorationLayer = DOM.buildSVG('g').get(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js?
const interactionLayer = DOM.buildSVG('g').get(); // 이것들은 연결선 관련 모듈 따로 만들기 검토. 모듈을 만든다면 둘을 같은 모듈에 넣기? _map-path.js?

let mapSize = [0, 0];

// export (화면 유닛이나 타일 관련 이벤트 핸들러 걸 수 있는 곳).



void (function main() {
  svgDefs.append(Hex.hexPolygon);
  svgLayers.append(Hex.layer, decorationLayer, interactionLayer);
  svg.append(svgDefs, svgLayers);
  viewport.append(svg, UnitStack.layer);

  UnitStack.test();
  UnitStack.addEventListenerUnitStackUI('click', target => console.log(target.key));
  Viewport.setUpdateMouseCoordinateHandler(updateMouseCoordinateHandler);
  performFrame();


  /** @type {Number | undefined} */
  let mouseIndex;
  // let mouseCoordinate = [0, 0];

  /** @param {number[]} coordinate */
  function updateMouseCoordinateHandler(coordinate) {
    const index = Coordinate.calcIndexFromCoordinate(coordinate, mapSize);

    // if (index !== undefined && index !== mouseIndex) {
    //   console.log(coordinate);
    // }

    // const coordinate = Viewport.mouseCoordinate;
    // if (!(coordinate[0] === mouseCoordinate[0] && coordinate[1] === mouseCoordinate[1])) {
    //   console.log(Viewport.mouseCoordinate);
    // }
    // mouseCoordinate = coordinate;

    mouseIndex = index;
  }

})();



function performFrame() {
  Viewport.performTransform();
  requestAnimationFrame(performFrame);
}



/** @param {import('../../types/communication.js').InitDataMap} initDataMap */
export function init(initDataMap) {
  mapSize = initDataMap.size;
  Hex.clearHexMap();
  Hex.setHexTextureList(initDataMap.initDataMapHex.terrainList);
  Hex.setHexMap(initDataMap.size, initDataMap.initDataMapHex.hexArray);
}



export function update(updateDataMap) {

}