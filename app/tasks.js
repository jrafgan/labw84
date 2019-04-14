const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', (req, res) => {

    res.send({message: 'ok'});
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        return res.send(task);

    } catch (error) {
        return res.status(400).send(error)
    }

});


module.exports = router;