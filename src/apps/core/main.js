// @ts-check
"use strict";
import express from 'express';
import { WebSocketServer } from 'ws';
import path from 'path';
import * as UserData from './userdata.js';
// import * as Model from '../public/model.js';
// import * as Coordinate from '../../shared/utils/coordinate.js';
// import { Message, UpdateData, SetUnit } from '../../shared/types/communication.js';



/** @type {WebSocketServer} */
let webSocketServer;

/** @type {Set<(data: import('../../shared/types/communication.js').UpdateData) => void>} */
const updateSet = new Set();
/** @type {Set<(data: import('../../shared/types/communication.js').CommandData[]) => void>} */
const commandSet = new Set();

//   /** @type {Map<String, import('./structure.js').Identifier>} */
// const identifierMap = new Map();
//   /** @type {Map<String, import('./structure.js').Faction>} */
// const factionMap = new Map();

const app = express();



/**
 * @param {String} baseDir
 * @param {Number} port
 */
export function start(baseDir, port) {
  const httpServer = app.listen(port);

  httpServer.on('listening', () => {
    console.log(`클라이언트: http://localhost:${port}`); // index.html?id=potapo
    console.log(httpServer.address())
    app.use('/', express.static(path.join(baseDir, 'apps', 'client')));
    app.use('/@shared/', express.static(path.join(baseDir, 'shared')));

    webSocketServer = new WebSocketServer({
      server: httpServer,
    });

    // HandlingUpdate();
    // HandlingCommand();

    // Receiving();
  });

  httpServer.on('error', /** @param {NodeJS.ErrnoException} err */ err => {
    console.log('error error error error error')
    if (err.code === "EADDRINUSE") {
      console.error("이미 사용중인 포트");
    } 
    else if (err.code === "EACCES") {
      console.error("권한 없는 포트");
      // start(baseDir, 5500)
    } 
    else {
      console.error(err);
    }

  });

}



function HandlingUpdate() {
  updateSet.add(handler);


  /** @param {import('../../shared/types/communication.js').UpdateData} data */
  function handler(data) {
    Model.update(data);
    sendMessage('update', data);
  }

}



function HandlingCommand() {
  commandSet.add(handler);


  /** @param {import('../../shared/types/communication.js').CommandData[]} commandDataList */
  function handler(commandDataList) {
    const constructor = new UpdateDataConstructor();

    for (const commandData of commandDataList) {
      switch (commandData.verb) {
        case 'move':
          let unit = constructor.get(commandData.subject);
          if (unit === undefined) continue;

          unit.coordinate = Coordinate.getCoordinateByIndex(commandData.object);
          break;
      }
    }

    requestUpdate(constructor.getUpdateData());
  }

}



class UpdateDataConstructor {
  /** @type {Map<Number, import('../public/structure/model.js').Unit>} */
  #unitMap = new Map();


  /** @param {Number} key */
  get(key) {
    let unit = this.#unitMap.get(key);
    if (unit === undefined) {
      unit = Model.unitMap.get(key);
      if (unit === undefined) return;
      this.#unitMap.set(key, unit);
    }
    return unit;
  }

  getUpdateData() {
    const data = new UpdateData();
    for (const [key, unit] of this.#unitMap) {
      data.setUnitList.push(new SetUnit(key, unit));
    }
    return data;
  }

}



function Receiving() {
  webSocketServer.on('connection', onconnection);

  /** @param {import('ws').WebSocket} ws */
  function onconnection(ws) {
    console.log(`클라이언트접속 [${ws.protocol}], numder: ${webSocketServer.clients.size}`);

    if (true) { // 여기는 나중에 ws.protocol의 권한 검사해서 연결결정으로 수정하기.
      if (ws.readyState === ws.OPEN) ws.send(JSON.stringify(new Message('init', Model.createInitData())));

      ws.on('message', msg => onmessage(ws.protocol, msg));
      ws.on('error', error => onerror(ws.protocol, error));
      ws.on('close', code => onclose(ws.protocol, code));
    }
  }

  /**
   * @param {String} protocol
   * @param {any} msg
   */
  function onmessage(protocol, msg) {
    console.log(`[${protocol}] 메세지 확인`);
    // 여기도 나중에 ws.protocol의 권한 검사하기?

    const {type, data} = JSON.parse(msg);
    switch (type) {
      case 'update':
        updateSet.forEach(func => func(data));
        break;

      case 'command':
        commandSet.forEach(func => func(data));
        break;
    }
  }

  /**
   * @param {String} protocol
   * @param {Error} error
   */
  function onerror(protocol, error) {
    console.log(`[${protocol}] 에러발생 : ${error}`);
  }

  /**
   * @param {String} protocol
   * @param {Number} code
   */
  function onclose(protocol, code) {
    console.log(`[${protocol}] 연결종료, code: ${code}, numder: ${webSocketServer.clients.size}`);
  }

}



/**
 * @param {String} type
 * @param {any} data
 */
function sendMessage(type, data) {
  const message = JSON.stringify(new Message(type, data));
  for (const client of webSocketServer.clients) {
    if (client.readyState !== client.OPEN) continue;
    client.send(message);
  }
}

/** @param {import('../../shared/types/communication.js').UpdateData} data */
function requestUpdate(data) {
  updateSet.forEach(func => func(data));
}