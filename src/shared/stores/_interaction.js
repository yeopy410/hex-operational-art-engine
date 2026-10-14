"use strict";
import * as Model from './model';
const [X, Y] = [0, 1];
const BUTTON = {
  LEFT  : 0,
  WHEEL : 1,
  RIGHT : 2
}

// 이 파일은 제거 예정.



/** @param {number[]} coordinate */
export function performMousedownHex(coordinate) {

}

/** @param {number[]} coordinate */
export function performMousemoveHex(coordinate) {

}



export function setMouseHandler() {
  return {
    /**
     * @param {number} button
     * @param {(ctx: MouseDownHandlerContext) => void} handler
     */
    mousedown(button, handler) {
      setMousedownHandler(button, handler);
      return setMouseHandler();
    },

    /**
     * @param {(ctx: MouseHandlerContext) => void} handler
     */
    mousemove(handler) {
      setMousemoveHandler(handler);
      return setMouseHandler();
    }

  }
}

/**
 * @param {number} button
 * @param {(ctx: MouseDownHandlerContext) => void} handler
 */
function setMousedownHandler(button, handler) {

}

/**
 * @param {(ctx: MouseHandlerContext) => void} handler
 */
function setMousemoveHandler(handler) {

}



class MouseHandlerContext {
  /**
   * @param {number[]} coordinate
   */
  constructor(coordinate) {
    this.coordinate = coordinate;
  }


  /** @param {(index: number) => void} func */
  ifHasSelectedUnit(func) {
    
  }

  /** @param {(key: number) => void} func */
  ifHasIndex(func) {
    const index = Model.calcIndexFromCoordinate(this.coordinate);
    if (index !== undefined) {
      func(index);
      return createElse(true);
    }
    return createElse(false);
  }

  ifHasUnit(func) {
    
  }

}

class MouseDownHandlerContext extends MouseHandlerContext {
  /**
   * @param {number[]} coordinate
   * @param {number} button
   */
  constructor(coordinate, button) {
    super(coordinate);
    this.button = button;
  }


  /**
   * @param {string} color
   * @param {(hexSet: Set<number>) => void} func
   */
  startDragSelectionHex(color, func) {
    /** @type {Set<number>} */
    const selectionSet = new Set();
  }

}



/** @param {Boolean} execution  */
function createElse(execution) {
  return {
    /** @param {() => void} func */
    else: func => {
      if (execution) func();
    }
  }
}



/** @type {number | undefined} */
let mouseIndex;
// let mouseCoordinate = [0, 0];

/** @param {number[]} coordinate */
function updateMouseCoordinateHandler(coordinate) {
  const index = Model.calcIndexFromCoordinate(coordinate);

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