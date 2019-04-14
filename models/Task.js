const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const TaskSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        required: true,
        status: ['new', 'in_progress', 'complete']
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;