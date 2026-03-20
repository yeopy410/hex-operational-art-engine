"use strict";
import * as Map from '/@shared/components/map/main.js';



// test
import { InitDataMap, InitDataMapHex, InitDataMapUnit } from '/@shared/types/communication.js';
{
  const [X, Y] = [0, 1];

  const size = [10, 10];
  const terrainList = ['rgb(245, 245, 220)']
  const hexArray = new Array(size[X] * size[Y]).fill(0);

  const initDataMapHex = new InitDataMapHex(terrainList, hexArray);
  const initDataMap = new InitDataMap(size, initDataMapHex, new InitDataMapUnit());

  Map.init(initDataMap);
  // Map.viewport.style.
  document.body.append(Map.viewport);
}