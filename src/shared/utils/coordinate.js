// @ts-check
"use strict";
import * as Vector2 from './vector2.js';
const [X, Y] = [0, 1];
export let size = [0,0];



/**
 * @param {Number[]} vector
 * @param {Number[]} divisor
 */
export function getCoordinateByVector(vector, divisor) {
  const coordinate = Vector2.divfloor(
    [vector [X], vector[Y] - divisor[Y]*0.5],
    [divisor[X], divisor[Y]*3]
  )
  return [ (coordinate[X] - (coordinate[Y]&1))>>1, coordinate[Y] ];
}

/**
 * @param {Number[]} coordinate
 */
export function isValidCoordinate(coordinate) {
  return (
    0 <= coordinate[X] && coordinate[X] < size[X] &&
    0 <= coordinate[Y] && coordinate[Y] < size[Y]
  )
}

/**
 * @param {Number[]} coordinate
 */
export function getIndexByCoordinate(coordinate) {
  if (
    0 <= coordinate[X] && coordinate[X] < size[X] &&
    0 <= coordinate[Y] && coordinate[Y] < size[Y]
  ) {
    return coordinate[X] + size[X]*coordinate[Y];
  }
}
/**
 * @param {Number} index
 */
export function getCoordinateByIndex(index) {
  const coordinateX = index % size[Y];
  return [coordinateX, (index-coordinateX) / size[Y]];
}
/**
 * @param {Number[][]} coordinates
 */
export function getIndexsByCoordinates(coordinates) {
  const indexs = [];
  for (const coordinate of coordinates) {
    const index = getIndexByCoordinate(coordinate);
    if (index !== undefined) indexs.push(index);
  }
  return indexs;
}

/**
 * @param {Number[]} relative
 */
export function getDistanceByRelativeCoordinate(relative) {
  const [dx, dy] = relative.map(Math.abs);
  return dy + Math.max(dx - Math.ceil(dy * 0.5), 0);
}
/**
 * @param {Number[]} coordinate
 * @param {Number} distance
 */
export function getCoordinatesByDistance(coordinate, distance) {
  const coordinates = [];
  for (let dx = distance+1; --dx;) {
    coordinates.push(shiftX(coordinate, dx));
    coordinates.push(shiftX(coordinate, -dx));
  }
  for (const direction of straightDirections) {
    let reference = shiftX(coordinate, -distance);
    for (let yCounter = distance+1; --yCounter;) {
      reference = getCoordinateByRelativeCoordinate(reference, direction);
      for (let dx = distance + yCounter; dx--;) {
        coordinates.push(shiftX(reference, dx));
      }
    }
  }
  return coordinates;
}

/**
 * @param {Number} index
 */
export function getIndexsByAround(index) {
  const indexs = [], coordinate = getCoordinateByIndex(index);
  for (const direction of directions) {
    const target = getIndexByCoordinate(getCoordinateByRelativeCoordinate(coordinate, direction));
    if (target !== undefined) indexs.push(target);
  }
  return indexs;
}

/**
 * @param {Number[]} reference
 * @param {Number[]} target
 */
export function getRelativeCoordinateByCoordinates(reference, target) {
  const [dx, dy] = Vector2.difference(reference, target);
  return [
    dx + (dx < 0? -(1 & dy & reference[Y]) : 1 & dy &(reference[Y] ^ 1)),
    dy
  ]
}
/**
 * @param {Number[]} reference
 * @param {Number[]} relative
 */
export function getCoordinateByRelativeCoordinate(reference, relative) {
  return [
    (reference[X] + relative[X]) + (relative[X] > 0? -(1 & relative[Y] & (reference[Y]^1)) : 1 & relative[Y] & reference[Y]),
    (reference[Y] + relative[Y])
  ]
}



/**
 * @param {Number[]} coordinate
 * @param {Number} dx
 */
function shiftX([px, py], dx) {
  return [px + dx, py];
}

const straightDirections = [[1,-1], [1,1]];

const directions = [
  [ 1,1],[ 1,0],[ 1,-1],
  [-1,1],[-1,0],[-1,-1]
]