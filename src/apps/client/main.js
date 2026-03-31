"use strict";
import { MapUI } from '/@shared/components/map/main.js';



// test
import { InitDataMap } from '/@shared/types/communication.js';
{
  const [X, Y] = [0, 1];

  const size = [50, 50];
  const terrainList = ['rgb(245, 245, 220)']
  const hexArray = new Array(size[X] * size[Y]).fill(0);

  const initDataMap = new InitDataMap(size, terrainList, hexArray);


  const mapUI = new MapUI();
  mapUI.init(initDataMap);
  document.body.append(mapUI);


  // mapUI.addMousemoveHandler(ctx => {
  //   console.log(ctx.coordinate)
  // })
  mapUI.addMousedownHandler(0, ctx => {
    console.log(ctx.coordinate)
  })


  resize();
  addEventListener('resize', resize);
  performFrame();

  function resize() {
    mapUI.resize([innerWidth, innerHeight]);
  }

  function performFrame() {
    mapUI.performTransform();
    requestAnimationFrame(performFrame);
  }

}