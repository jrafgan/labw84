const express = require('express');
const config = require('./config');
const cors = require('cors');
const mongoose = require('mongoose');
const tasks = require('./app/tasks');
const users = require('./app/users');

const app = express();

app.use(cors());
app.use(express.json());

const port = 8003;

mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/tasks', tasks);
    app.use('/users', users);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});