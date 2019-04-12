const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const TaskSchema = new Schema({
    task: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['new', 'in_progress', 'complete']
    }
});
