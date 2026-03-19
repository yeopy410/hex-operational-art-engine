// @ts-check
"use strict";
import * as Communication from './communication.js';

addEventListener('load', main, {once : true});
document.title = `어드민`



function main() {
  const root = document.querySelector('main');
  if (!root) return;

  Communication.start();



}