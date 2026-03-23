"use strict";
import * as DOM from '../../utils/dom.js';
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
import * as Setting from './setting.js';
const [X, Y] = [0, 1];
const BUTTON = {
  LEFT  : 0,
  WHEEL : 1,
  RIGHT : 2
}



export const body = DOM.buildHTML('div').setClassList('map-viewport').get();

export let vector = [0,0];
export let scale = 1;

let isUpdated = true;

// export let mouseCoordinate = [0, 0];
// /** @type {Number | undefined} */
// export let mouseIndex;



void (function main() {
  HandlingWheel();
  HandlingMouse();
  performFrame();
})();



function performFrame() { // 함수명을 update로 바꾸고, requestAnimationFrame을 외부고 빼는거 검토.
  if (isUpdated) {
    body.style.setProperty('--layer-x', `${vector[X]}px`);
    body.style.setProperty('--layer-y', `${vector[Y]}px`);
    body.style.setProperty('--scale', scale.toString());
    isUpdated = false;
  }
  requestAnimationFrame(performFrame);
}

/**
 * @param {Number[]} referenceVector
 * @param {Number[]} mouseVector
 * @param {Number} scaleRatio
 */
function setVector(referenceVector, mouseVector, scaleRatio) {
  vector = Vector2.add(
    Vector2.scalarMul(referenceVector, scaleRatio),
    Vector2.scalarMul(mouseVector, 1-scaleRatio)
  );
  isUpdated = true;
}



function HandlingWheel() {
  body.addEventListener('wheel', wheel);


  /** @param {WheelEvent} e */
  function wheel(e) {
    const referenceScale = scale;
    scale = limitedToRange(scale-e.deltaY*Setting.SCALE_DELTA_MUL, Setting.SCALE_MIN, Setting.SCALE_MAX);
    setVector(vector, getMapMouseVector([e.clientX,e.clientY]), scale/referenceScale);
  }

}



function HandlingMouse() {
  body.addEventListener('mousedown', mousedown);
  // body.addEventListener('mousemove', mousemove); // [타일 마우스오버, 타일 클릭] 헨들링은 if (e.target is 타일) 방식 말고 기존의 마우스벡터 방식 그대로 유지하기?


  /** @param {MouseEvent} e */
  function mousedown(e) {
    if (e.button === BUTTON.WHEEL) {
      moveUp(BUTTON.WHEEL, MouseWheelMove(Vector2.difference(vector, getMapMouseVector([e.clientX, e.clientY])), scale));
    }
  }

  // /** @param {MouseEvent} e */
  // function mousemove(e) {
  //   mouseCoordinate = Coordinate.getCoordinateByVector(Vector2.difference(vector, getMapMouseVector([e.clientX, e.clientY])), gridSize);
  //   mouseIndex = Coordinate.getIndexByCoordinate(mouseCoordinate);
  // }

  /**
   * @param {number[]} referenceVector
   * @param {number} referenceScale
   * @returns {(e: MouseEvent) => void}
   */
  function MouseWheelMove(referenceVector, referenceScale) {
    return e => setVector(
      Vector2.difference(referenceVector, getMapMouseVector([e.clientX, e.clientY])),
      getMapMouseVector([e.clientX, e.clientY]),
      scale / referenceScale
    );
  }

  /**
   * @param {Number} button
   * @param {(e: MouseEvent) => void} moveHandler
   * @param {(e: MouseEvent) => void} upHandler
   */
  function moveUp(button, moveHandler, upHandler=e=>{}) {
    /** @param {MouseEvent} e */
    const mouseup = e => {
      if (e.button !== button) return;
      upHandler(e);

      removeEventListener('mousemove', moveHandler);
      removeEventListener('mouseup', mouseup);
    }

    addEventListener('mousemove', moveHandler);
    addEventListener('mouseup', mouseup)
  }

}



/** @param {Number[]} clientMouseVector  */
function getMapMouseVector(clientMouseVector) {
  const rect = body.getBoundingClientRect();
  return Vector2.difference([rect.left, rect.top], clientMouseVector);
}



/**
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 */
function limitedToRange(val, min, max) {
  return Math.min(Math.max(val, min), max);
}