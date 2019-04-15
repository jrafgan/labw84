const express = require('express');
const User = require('../models/User');
const router = express.Router();
const auth =require('../middleware/auth');

router.post('/', async (req, res) => {
    const user = new User(req.body);
    user.generateToken();
    try {
        await user.save();
        return res.send({token: user.token});

    } catch (error) {
        return res.status(400).send(error)
    }

});

router.post('/sessions', auth, async (req, res) => {

    const user = new User(req.user);
    const isMatch = await user.checkPassword(user.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Username/Password is incorrect'});
    }
    res.send({message: 'Username and password correct!'})

});

module.exports = router;