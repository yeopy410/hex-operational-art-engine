"use strict";
import { Message, WebSocketProtocol } from '/@shared/types/communication.js';



const searchParams = new URLSearchParams(location.search);
const socketProtocol = JSON.stringify(new WebSocketProtocol(
  searchParams.get('team') || 'Null',
  searchParams.get('password') || 'Null',
  searchParams.get('name') || 'anonymous'
));
const socketUrl = (location.protocol == 'https:'? 'wss://' : 'ws://') + location.host;

/** @type {WebSocket} */
let socket;

/**
 * @type {Map<string, (data: any) => void>}
 * open  : 소켓 연결 트리거,
 * close : 소켓 연결해제 트리거
 */
export const handler = new Map();



export function start() {
  socket = request();
  socket.onopen = () => {
    console.log(
      '연결성공',
      searchParams.get('name'),
      socket.protocol
    );
    connect();
  }
}



export function checkOPEN() {
  return socket? socket.readyState === WebSocket.OPEN : false;
}

/**
 * @param {String} type
 * @param {any} data
 */
export function send(type, data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(new Message(type, data)));
    return true;
  }
  console.log('전송실패');
  return false;
}

export function reconnect() {
  if (!socket) return;
  socket.close();
  socket = request();
  socket.onopen = () => {
    console.log('재연결성공');
    connect();
  }
}



function request() {
  return new WebSocket(socketUrl, socketProtocol);
}

function connect() {
  performHandler('open');

  socket.onmessage = event => {
    const {type, data} = JSON.parse(event.data);
    performHandler(type, data);
  }

  socket.onerror = error => {
    console.log(error);
  }

  /** @param {CloseEvent} event */
  socket.onclose = event => {
    console.log('연결종료', event.code);
    performHandler('close');
    if (!event.wasClean) reconnect();
  }

}



/**
 * @param {String} key
 * @param {any} [data]
 */
function performHandler(key, data) {
  const targetHandler = handler.get(key);
  if (targetHandler) {
    targetHandler(data);
  }
}