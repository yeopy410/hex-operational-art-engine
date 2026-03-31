"use strict";
import * as Coordinate from '../utils/coordinate.js';

let size = [0, 0];



/** @param {import('../types/communication.js').InitData} initData */
export function init(initData) {
  
}



/** @param {import('../types/communication.js').UpdateData} updateData */
export function update(updateData) {
  
}



/** @param {number[]} coordinate */
export function calcIndexFromCoordinate(coordinate) {
  return Coordinate.calcIndexFromCoordinate(coordinate, size);
}

/** @param {number} index */
export function calcCoordinateFromIndex(index) {
  return Coordinate.calcCoordinateFromIndex(index, size);
}

/** @param {number} index */
export function calcNeighborIndexesFromIndex(index) {
  return Coordinate.calcNeighborIndexesFromIndex(index, size);
}