// @ts-check
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