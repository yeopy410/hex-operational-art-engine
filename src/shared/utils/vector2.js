// @ts-check
"use strict";
const [X, Y] = [0, 1];

/**
 * @param {Number[][]} vector2List
 */
export function sum(vector2List) {
  let sum = [0, 0];
  for (const vector of vector2List) {
    sum[X] += vector[X];
    sum[Y] += vector[Y];
  }
  return sum;
}

/**
 * @param {Number[]} reference
 * @param {Number[]} target
 */
export function add(reference, target) {
  return [
    reference[X] + target[X],
    reference[Y] + target[Y]
  ]
}
/**
 * @param {Number[]} reference
 * @param {Number[]} target
 */
export function difference(reference, target) {
  return [
    target[X] - reference[X],
    target[Y] - reference[Y]
  ]
}

/**
 * @param {Number[]} vector2
 * @param {Number} scalar
 */
export function scalarMul(vector2, scalar) {
  return [vector2[X]*scalar, vector2[Y]*scalar];
}

/**
 * @param {Number[]} dividend
 * @param {Number[]} divisor
 */
export function divfloor(dividend, divisor) {
  return [
    Math.floor(dividend[X] / divisor[X]),
    Math.floor(dividend[Y] / divisor[Y])
  ]
}

/**
 * @param {Number[]} dividend
 * @param {Number[]} divisor
 */
export function divmod(dividend, divisor) {
  const remainder = [
    dividend[X] % divisor[X],
    dividend[Y] % divisor[Y]
  ];
  const quotient = [
    (dividend[X] - remainder[X]) / divisor[X],
    (dividend[Y] - remainder[Y]) / divisor[Y]
  ];
  return [quotient, remainder];
}

/**
 * @param {Number[]} vector2
 */
export function hypotenuse(vector2) {
  return Math.sqrt( vector2[X]**2 + vector2[Y]**2 );
}