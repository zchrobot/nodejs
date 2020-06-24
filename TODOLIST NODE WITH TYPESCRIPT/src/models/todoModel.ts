import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    username: String,
    todo: String,
    isDone: Boolean,
    hasAttachment: Boolean
});

const Todos = mongoose.model('Todos', todoSchema);

export default Todos;