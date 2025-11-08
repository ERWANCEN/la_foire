'use strict';

const express = require('express');
const router = express.Router();

const ModelAvis = require('../models/avis.model');

// GET - Récupérer tous les avis
router.get('/all', async (req, res) => {
    try {
        const avis = await ModelAvis.find();
        res.status(200).json(avis);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// POST - Ajouter un avis
router.post('/add', async (req, res) => {
    try {
        const avis = await ModelAvis.create(req.body);
        res.status(201).json(avis);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// UPDATE - Modifier un avis depuis son ID
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const modifiedAvis = await ModelAvis.findByIdAndUpdate(id, req.body, { new: true });

        if(!modifiedAvis) return res.status(404).json('AVIS NOT FOUND');

        res.status(200).json(modifiedAvis);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// DELETE - Supprimer un avis depuis son ID
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAvis = await ModelAvis.findByIdAndDelete(id);

        if(!deletedAvis) return res.status(404).json('AVIS NOT FOUND');

        res.status(200).json('Avis deleted !');
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router;