"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
dotenv.config();
var app_1 = require("./app");
var express = require("express");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var mongoURL = process.env.MONGODB_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true }, function (err) {
    // if (err) throw err;
});
app_1.default.use('/assets', express.static(__dirname + "/public"));
app_1.default.set('view engine', 'esj');
app_1.default.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("server is listening on " + port);
});
//# sourceMappingURL=index.js.map