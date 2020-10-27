"use strict";
exports.__esModule = true;
var grpc_1 = require("grpc");
var users_1 = require("./services/users");
var transactions_1 = require("./services/transactions");
var db_1 = require("./dbconfig/db");
var initServer = function (port) {
    var server = new grpc_1.Server({
        'grpc:max_receive_message_length': 1,
        'grpc:max_send_message_length': 1
    });
    server.bind("" + port, grpc_1.ServerCredentials.createInsecure());
    server.addService(users_1.UsersService, new users_1.Users());
    server.addService(transactions_1.TransactionsService, new transactions_1.Transactions());
    db_1["default"].connect(function (err, client, done) {
        if (err)
            throw err;
        console.log('db connected');
    });
    return server;
};
exports["default"] = initServer;
