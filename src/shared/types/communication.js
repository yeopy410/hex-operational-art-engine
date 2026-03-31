"use strict";

export class Message {
  /**
   * @param {string} type
   * @param {*} data
   */
  constructor(
    type,
    data
  ) {
    this.type = type;
    this.data = data;
  }
}

export class WebSocketProtocol {
  /**
   * @param {string} team
   * @param {string} password
   * @param {string} name
   */
  constructor(
    team,
    password,
    name
  ) {
    this.team = team;
    this.password = password;
    this.name = name;
  }
}



export class InitData { // 세력 데이터도 추가 필요.
  /**
   * @param {InitDataMap} initDataMap
   */
  constructor(
    initDataMap
  ) {
    this.initDataMap = initDataMap;
  }
}

export class InitDataMap { // 추가로 장식SVG(강과 연결로 등)와 거점 데이터도 추가 필요. UI와 명령생성용 ZOC나 보급망이나 지휘망은 클라이언트에서 직접 계산하기?
  /**
   * @param {number[]} size
   * @param {string[]} terrainList
   * @param {number[]} hexArray
   */
  constructor( // 추가로 유닛카테고리 리스트, 유닛 리스트
    size,
    terrainList,
    hexArray,
  ) {
    this.size = size;
    this.terrainList = terrainList;
    this.hexArray = hexArray;
  }
}



export class UpdateData {
  업데이트리스트1 = [];
  업데이트리스트2 = [];
  업데이트리스트3 = [];
  업데이트리스트4 = [];
}