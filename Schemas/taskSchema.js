const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'done']
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = taskSchema;