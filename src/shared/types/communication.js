"use strict";

export class Message {
  /**
   * @param {String} type
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
   * @param {String} team
   * @param {String} password
   * @param {String} name
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
   * @param {Number[]} size
   * @param {InitDataMapHex} initDataMapHex
   * @param {InitDataMapUnit} initDataMapUnit
   */
  constructor(
    size,
    initDataMapHex,
    initDataMapUnit
  ) {
    this.size = size;
    this.initDataMapHex = initDataMapHex;
    this.initDataMapUnit = initDataMapUnit;
  }
}

export class InitDataMapHex {
  /**
   * @param {String[]} terrainList
   * @param {Number[]} hexArray
   */
  constructor(
    terrainList,
    hexArray
  ) {
    this.terrainList = terrainList;
    this.hexArray = hexArray;
  }
}

export class InitDataMapUnit { // 유닛카테고리 리스트, 유닛스텍{위치인덱스, [...유닛들], ZOC여부?}리스트, 적유닛{위치인덱스, 적유닛데이터{}(유닛 리스트 아님, 정찰정보임), ZOC여부}리스트.
  /**
   * 
   */
  constructor(
    
  ) {
    
  }
}



export class UpdateData {
  업데이트리스트1 = [];
  업데이트리스트2 = [];
  업데이트리스트3 = [];
  업데이트리스트4 = [];
}