"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});
var Todos = mongoose.model('Todos', todoSchema);
exports.default = Todos;
//# sourceMappingURL=todoModel.js.map