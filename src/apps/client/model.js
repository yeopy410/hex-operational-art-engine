"use strict";
import * as Coordinate from '/@shared/utils/coordinate.js';
// 모델 데이터에 대한 처리는 공통된 것들은 유틸에 넣고, 모델을 다르게 다루고 관리하는 각각의 앱들의 전용 모듈들을 만들기?

export let size = [0, 0];



/** @param {import('/@shared/types/communication.js').InitData} initData */
export function init(initData) {
  
}



/** @param {import('/@shared/types/communication.js').UpdateData} updateData */
export function update(updateData) {
  
}



/** @param {Number[]} coordinate */
export function calcIndexFromCoordinate(coordinate) {
  return Coordinate.calcIndexFromCoordinate(coordinate, size);
}

/** @param {Number} index */
export function calcCoordinateFromIndex(index) {
  return Coordinate.calcCoordinateFromIndex(index, size);
}

/** @param {Number} index */
export function calcNeighborIndexesFromIndex(index) {
  return Coordinate.calcNeighborIndexesFromIndex(index, size);
}