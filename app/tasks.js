const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');
const mongoose = require("mongoose");

mongoose.set('useFindAndModify', false);

router.get('/', auth, async (req, res) => {
    try {
        const user = req.user;
        const tasks = await Task.find({user: user._id});
        res.send(tasks);
    } catch (error) {
        return res.status(400).send(error)
    }
});
router.put('/:id', auth, async (req, res) => {
    try {

        await Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, doc) => {
            if (err) {
                console.log("wrong task id");
            }
            res.send(doc);
        });
    } catch (error) {
        return res.status(400).send(error)
    }
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


router.delete('/:id', auth, async (req, res) => {

    try {
        const query = {_id: req.params.id};
        const field = req.body;
        await Task.findOneAndDelete(req.params.id, (err, doc) => {
            if (err) {
                console.log("Not deleted");
            }
            res.send(doc);
        });
    } catch (error) {
        return res.status(400).send(error)
    }
});


module.exports = router;