"use strict";
import * as Coordinate from '../../utils/coordinate.js';
import * as Vector2 from '../../utils/vector2.js';
import { maybe } from '../../utils/functional.js'
const [X, Y] = [0, 1];
const BUTTON = {
  LEFT  : 0,
  WHEEL : 1,
  RIGHT : 2
}

// 여길 _interaction.js로 바꾸기?



/**
 * @typedef {Object} MousedownHandlerCtx
 * @property {MouseEvent} event
 * @property {number[]} coordinate
 * @property {(color: string, handler: (hexSet: Set<number>) => void) => void} startDragSelectionHex
 * 
 * @typedef {Object} MousemoveHandlerCtx
 * @property {MouseEvent} event
 * @property {number[]} coordinate
 */

export class DataObject {
  /**
   * @param {import('./setting.js').IMapSetting} setting
   * @param {HTMLElement} viewport
   */
  constructor(setting, viewport) {
    this.setting = setting;
    this.viewport = viewport;
    this.vector = [0,0];
    this.scale = 1;
    this.isUpdated = true;
    /** @type {Map<number, Set<(ctx: MousedownHandlerCtx) => void>>} */
    this.MousedownHandlerSetMap = new Map();
    /** @type {Set<(ctx: MousemoveHandlerCtx) => void>} */
    this.mousemoveHandlerSet = new Set();
  }
}



/** @param {DataObject} data */
export function performTransform(data) {
  if (data.isUpdated) {
    data.viewport.style.setProperty('--layer-x', `${data.vector[X]}px`);
    data.viewport.style.setProperty('--layer-y', `${data.vector[Y]}px`);
    data.viewport.style.setProperty('--scale', data.scale.toString());
    data.isUpdated = false;
  }
}



/** @param {DataObject} data */
export function startHandling(data) {
  let mousemoveCoordinate = [0];
  data.viewport.addEventListener('wheel', wheel);
  data.viewport.addEventListener('mousemove', mousemove);
  data.viewport.addEventListener('mousedown', mousedown);


  /** @param {WheelEvent} e */
  function wheel(e) {
    setScale(
      data,
      calcViewportOffsetVector(data, e),
      limitedToRange(
        data.scale-e.deltaY * data.setting.scaleDeltaMul,
        data.setting.scaleMin,
        data.setting.scaleMax
      )
    );
  }


  /** @param {MouseEvent} e */
  function mousemove(e) {
    const coordinate = calcCoordinateFromMouseEvent(data, e);
    if (coordinate[0] === mousemoveCoordinate[0] && coordinate[1] === mousemoveCoordinate[1]) return;

    mousemoveCoordinate = coordinate;
    const ctx = {
      event: e,
      coordinate: coordinate
    }
    data.mousemoveHandlerSet.forEach(handler => handler(ctx));
  }


  /** @param {MouseEvent} e */
  function mousedown(e) {
    maybe(data.MousedownHandlerSetMap.get(e.button)).ifSome(MousedownHandlerSet => {
      const ctx = {
        event: e,
        coordinate: calcCoordinateFromMouseEvent(data, e),
        startDragSelectionHex: createStartDragSelectionHex(data, e.button)
      }
      MousedownHandlerSet.forEach(handler => handler(ctx));
    });

    if (e.button === BUTTON.WHEEL) {
      const referenceVector = Vector2.delta(data.vector, calcViewportOffsetVector(data, e));
      const referenceScale = data.scale;

      /** @param {MouseEvent} e */
      const wheelmove = e => {
        const viewportOffsetVector = calcViewportOffsetVector(data, e);
        setVector(
          data,
          viewportOffsetVector,
          Vector2.delta(referenceVector, viewportOffsetVector),
          referenceScale
        );
      }

      /** @param {MouseEvent} e */
      const mouseup = e => {
        if (e.button !== BUTTON.WHEEL) return;

        removeEventListener('mousemove', wheelmove);
        removeEventListener('mouseup', mouseup);
      }

      addEventListener('mousemove', wheelmove);
      addEventListener('mouseup', mouseup);
    }

  }

}



/**
 * @param {DataObject} data
 * @param {number} button
 */
function createStartDragSelectionHex(data, button) { // 추후에 기능 넣기 필요.
  /** @type {(color: string, handler: (hexSet: Set<number>) => void) => void} */
  const func = (color, handler) => {
    // 오버레이 만들고, mousemoveHandlerSet에 dragHandler 추가하고
    // 마우스업에 button조건으로 handler 실행과 dragHandler와 마우스업Handler 회수 추가하고
  }
  return func;
}



/**
 * @param {DataObject} data
 * @param {MouseEvent} event
 */
function calcCoordinateFromMouseEvent(data, event) {
  return Coordinate.calcCoordinateFromVector(
    Vector2.scalarMul(Vector2.delta(data.vector, calcViewportOffsetVector(data, event)), 1/data.scale),
    data.setting.gridSize
  )
}



/**
 * @param {DataObject} data
 * @param {number[]} pivotVector
 * @param {number[]} newVector
 * @param {number} referenceScale
 */
function setVector(data, pivotVector, newVector, referenceScale) {
  data.vector = Vector2.add(
    pivotVector,
    Vector2.scalarMul(
      Vector2.delta(pivotVector, newVector),
      data.scale / referenceScale
    )
  );
  data.isUpdated = true;
}

/**
 * @param {DataObject} data
 * @param {number[]} pivotVector
 * @param {number} newScale
 */
function setScale(data, pivotVector, newScale) {
  const referenceScale = data.scale;
  data.scale = newScale;
  setVector(data, pivotVector, data.vector, referenceScale);
}



/**
 * @param {DataObject} data
 * @param {MouseEvent} e
 */
function calcViewportOffsetVector(data, e) {
  const rect = data.viewport.getBoundingClientRect();
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