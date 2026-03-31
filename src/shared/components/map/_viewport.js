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



export const body = DOM.buildHTML('div').addClassList('map-viewport').build();

let vector = [0,0];
let scale = 1;
let isUpdated = true;



void (function main() {
  HandlingWheel();
  HandlingMouse();
})();



export function performTransform() {
  if (isUpdated) {
    body.style.setProperty('--layer-x', `${vector[X]}px`);
    body.style.setProperty('--layer-y', `${vector[Y]}px`);
    body.style.setProperty('--scale', scale.toString());
    isUpdated = false;
  }
}



/** @param {MouseEvent} event */
export function calcCoordinateFromMouseEvent(event) {
  return Coordinate.calcCoordinateFromVector(
    Vector2.scalarMul(Vector2.delta(vector, calcViewportOffsetVector(event)), 1/scale),
    Setting.GRID_SIZE
  )
}



function HandlingWheel() {
  body.addEventListener('wheel', wheel);


  /** @param {WheelEvent} e */
  function wheel(e) {
    setScale(
      calcViewportOffsetVector(e),
      limitedToRange(scale-e.deltaY*Setting.SCALE_DELTA_MUL, Setting.SCALE_MIN, Setting.SCALE_MAX)
    );
  }

}



function HandlingMouse() {
  body.addEventListener('mousedown', mousedown);


  /** @param {MouseEvent} e */
  function mousedown(e) {
    if (e.button === BUTTON.WHEEL) {
      moveUp(BUTTON.WHEEL, MouseWheelMove(Vector2.delta(vector, calcViewportOffsetVector(e)), scale));
    }
  }

  /**
   * @param {number[]} referenceVector
   * @param {number} referenceScale
   * @returns {(e: MouseEvent) => void}
   */
  function MouseWheelMove(referenceVector, referenceScale) {
    return e => {
      const viewportOffsetVector = calcViewportOffsetVector(e);
      setVector(
        viewportOffsetVector,
        Vector2.delta(referenceVector, viewportOffsetVector),
        referenceScale
      );
    }
  }

  /**
   * @param {number} button
   * @param {(e: MouseEvent) => void} moveHandler
   * @param {(e: MouseEvent) => void} upHandler
   */
  function moveUp(button, moveHandler, upHandler=e=>{}) { // 이거 다른 곳에서 재사용할 생각없다면 MouseWheelMove와 함께 mousedown에 통합 고려.
    /** @param {MouseEvent} e */
    const mouseup = e => {
      if (e.button !== button) return;
      upHandler(e);

      removeEventListener('mousemove', moveHandler);
      removeEventListener('mouseup', mouseup);
    }

    addEventListener('mousemove', moveHandler);
    addEventListener('mouseup', mouseup);
  }

}



/**
 * @param {number[]} pivotVector
 * @param {number[]} newVector
 * @param {number} referenceScale
 */
function setVector(pivotVector, newVector, referenceScale) {
  vector = Vector2.add(
    pivotVector,
    Vector2.scalarMul(
      Vector2.delta(pivotVector, newVector),
      scale / referenceScale
    )
  );
  isUpdated = true;
}

/**
 * @param {number[]} pivotVector
 * @param {number} newScale
 */
function setScale(pivotVector, newScale) {
  const referenceScale = scale;
  scale = newScale;
  setVector(pivotVector, vector, referenceScale);
}



/** @param {MouseEvent} e */
function calcViewportOffsetVector(e) {
  const rect = body.getBoundingClientRect();
  return Vector2.delta([rect.left, rect.top], [e.clientX, e.clientY]);
}



/**
 * @param {number} val
 * @param {number} min
 * @param {number} max
 */
function limitedToRange(val, min, max) {
  return Math.min(Math.max(val, min), max);
}