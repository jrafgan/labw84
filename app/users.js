const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth =require('../middleware/auth');

router.post('/', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        return res.send(user);

    } catch (error) {
        return res.status(400).send(error)
    }

});

router.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Password is incorrect'});
    }
    res.send({message: 'Username and password correct!'})
});

module.exports = router;