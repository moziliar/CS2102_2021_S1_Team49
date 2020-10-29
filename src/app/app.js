"use strict";
exports.__esModule = true;
var server_1 = require("./server");
var port = parseInt(process.env.PORT || '4000');
console.log('init server');
var server = server_1["default"](port);
console.log('starting server');
server.start();
console.log('server started');
