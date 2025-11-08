'use strict';

const express = require('express');
const router = express.Router();
const ModelUser = require('../models/user.model');

// GET
router.get('/all', async (req, res) => {
    try {        
        const users = await ModelUser.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// POST
router.post('/add', async (req, res) => {
    try {
        const newUser = await ModelUser.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// UPDATE
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const modifiedUser = await ModelUser.findByIdAndUpdate(id, req.body, { new: true });
        
        if(!modifiedUser) return res.status(404).json('USER NOT FOUND');

        res.status(200).json(modifiedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await ModelUser.findByIdAndDelete(id)

        if(!user) return res.status(404).json('USER NOT FOUND');

        res.status(200).json('User deleted !');
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;