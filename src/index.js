"use strict";
import path from 'path';
import { fileURLToPath } from 'url';
import * as Admin from './apps/admin/main.js';
import * as Server from './apps/core/main.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



void (function main() {
  console.log(__dirname);
  Admin.start(__dirname);
  Server.start(__dirname, 5000);
})();