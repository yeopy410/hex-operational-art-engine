"use strict";
import * as Map from '/@shared/components/map/main.js';



// test
import { InitDataMap, InitDataMapHex, InitDataMapUnit } from '/@shared/types/communication.js';
{
  const [X, Y] = [0, 1];

  const size = [50, 50];
  const terrainList = ['rgb(245, 245, 220)']
  const hexArray = new Array(size[X] * size[Y]).fill(0);

  const initDataMapHex = new InitDataMapHex(terrainList, hexArray);
  const initDataMap = new InitDataMap(size, initDataMapHex, new InitDataMapUnit());

  Map.init(initDataMap);
  // Map.viewport.style.width = '500px';
  // Map.viewport.style.height = '500px';
  // Map.viewport.style.transform = 'translate(100px, 50px)';
  // Map.viewport.style.marginLeft = '150px';

  document.body.append(Map.viewport);

  resize();
  addEventListener('resize', resize);
}


function resize() {
  Map.viewport.style.width  = `${innerWidth}px`;
  Map.viewport.style.height = `${innerHeight}px`;
}