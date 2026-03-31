// @ts-check
"use strict";
import * as Vector2 from './vector2.js';
const [X, Y] = [0, 1];

/**
 * @param {number[]} reference
 * @param {number[]} gridSize
 * @returns {(target: number[]) => number[]}
 */
export function createCalcVectorFromCoordinate(reference, gridSize) {
  return target => [
    reference[X] + gridSize[X]*( target[X]*2 + (target[Y] & 1) ),
    reference[Y] + gridSize[Y]*target[Y]*3
  ]
}
/**
 * @param {number[]} vector
 * @param {number[]} gridSize
 */
export function calcCoordinateFromVector(vector, gridSize) {
  const coordinate = Vector2.divfloor(
    [vector[X], vector[Y] - gridSize[Y]*0.5],
    [gridSize[X], gridSize[Y]*3]
  )
  return [ (coordinate[X] - (coordinate[Y]&1))>>1, coordinate[Y] ];
}

/**
 * 인덱스가 undefined라면 size를 벗어난 유효하지 않은 좌표라는 의미.
 * @param {number[]} coordinate
 * @param {number[]} size
 */
export function calcIndexFromCoordinate(coordinate, size) {
  if (
    0 <= coordinate[X] && coordinate[X] < size[X] &&
    0 <= coordinate[Y] && coordinate[Y] < size[Y]
  ) {
    return coordinate[X] + size[X]*coordinate[Y];
  }
}
/**
 * @param {number} index
 * @param {number[]} size
 */
export function calcCoordinateFromIndex(index, size) {
  const coordinateX = index % size[Y];
  return [coordinateX, (index-coordinateX) / size[Y]];
}
/**
 * @param {number[][]} coordinates
 * @param {number[]} size
 */
export function calcIndexesFromCoordinates(coordinates, size) {
  const indexes = [];
  for (const coordinate of coordinates) {
    const index = calcIndexFromCoordinate(coordinate, size);
    if (index !== undefined) indexes.push(index);
  }
  return indexes;
}

/**
 * @param {number[]} relative
 */
export function calcDistanceFromRelativeCoordinate(relative) {
  const [dx, dy] = relative.map(Math.abs);
  return dy + Math.max(dx - Math.ceil(dy * 0.5), 0);
}
/**
 * @param {number[]} coordinate
 * @param {number} distance
 */
export function calcCoordinatesFromDistance(coordinate, distance) {
  const coordinates = [];
  for (let dx = distance+1; --dx;) {
    coordinates.push(shiftX(coordinate, dx));
    coordinates.push(shiftX(coordinate, -dx));
  }
  for (const direction of straightDirections) {
    let reference = shiftX(coordinate, -distance);
    for (let yCounter = distance+1; --yCounter;) {
      reference = calcCoordinateFromRelativeCoordinate(reference, direction);
      for (let dx = distance + yCounter; dx--;) {
        coordinates.push(shiftX(reference, dx));
      }
    }
  }
  return coordinates;
}

/**
 * @param {number} index
 * @param {number[]} size
 */
export function calcNeighborIndexesFromIndex(index, size) {
  const indexes = [], coordinate = calcCoordinateFromIndex(index, size);
  for (const direction of directions) {
    const target = calcIndexFromCoordinate(calcCoordinateFromRelativeCoordinate(coordinate, direction), size);
    if (target !== undefined) indexes.push(target);
  }
  return indexes;
}

/**
 * @param {number[]} reference
 * @param {number[]} target
 */
export function calcRelativeCoordinateFromCoordinates(reference, target) {
  const [dx, dy] = Vector2.delta(reference, target);
  return [
    dx + (dx < 0? -(1 & dy & reference[Y]) : 1 & dy &(reference[Y] ^ 1)),
    dy
  ]
}
/**
 * @param {number[]} reference
 * @param {number[]} relative
 */
export function calcCoordinateFromRelativeCoordinate(reference, relative) {
  return [
    (reference[X] + relative[X]) + (relative[X] > 0? -(1 & relative[Y] & (reference[Y]^1)) : 1 & relative[Y] & reference[Y]),
    (reference[Y] + relative[Y])
  ]
}



/**
 * @param {number[]} coordinate
 * @param {number} dx
 */
function shiftX([x, y], dx) {
  return [x + dx, y];
}

const straightDirections = [[1,-1], [1,1]];

const directions = [
  [ 1,1],[ 1,0],[ 1,-1],
  [-1,1],[-1,0],[-1,-1]
]