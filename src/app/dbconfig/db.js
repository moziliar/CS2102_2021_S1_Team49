"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://user:password@localhost:5432/pcs',
    idleTimeoutMillis: 30000
});
exports["default"] = pool;
