﻿const APP_PORT = 8081;
const STATIC_PORT = 8082;

// starts static test webserver
var staticServer = require('./tests.static-server.js');
staticServer.start(STATIC_PORT);

// starts REST and websocket servers
var restServer = require('./server-rest.js');
var socketServer = require('./server-socket.js');
const serverData = require('./server-data.js');

restServer.start(APP_PORT, serverData, function (server) {
    socketServer.start(server, serverData);
});

process.on('uncaughtException', (err) => console.log(`ERR: ${err.message}`));
