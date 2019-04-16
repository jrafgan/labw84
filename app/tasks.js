const express = require('express');
const mongoose = require("mongoose");
const auth = require('../middleware/auth');
mongoose.set('useFindAndModify', false);
const Task = require('../models/Task');

const router = express.Router();

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
    if (req.body.user) {
        req.body.user = req.user._id
    }

    try {
        await Task.findByIdAndUpdate({_id: req.params.id}, {$set: req.body}, {new: true}, (err, doc) => {
            if (err) {
                console.log("wrong task id");
            }
            res.send(doc);
        });
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.post('/', auth, async (req, res) => {
    const task = new Task(req.body);
    task.user = req.user._id;
    task.status = "new";

    try {
        await task.save();
        return res.send(task);

    } catch (error) {
        return res.status(400).send(error)
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id}, (err, doc) => {
            if (err) {
                console.log("Something went wrong");
            }
            res.status(200).send({message: "Task successfully removed"});
        });
    } catch (error) {
        return res.status(400).send(error)
    }
});

module.exports = router;