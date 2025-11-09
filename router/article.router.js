'use strict';

const express = require('express');
const router = express.Router();

const ModelArticle = require('../models/article.model');

// GET - Récupérer tous les articles
router.get('/all', async (req, res) => {
    try {
        const articles = await ModelArticle.find();

        if(!articles) return res.status(404).json('NO ARTICLES');

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//GET by ID - Récupérer l'article correspondant à l'ID entré dans l'url
router.get('/get/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const articles = await ModelArticle.findById(id);

        if(!articles) return res.status(404).json('ARTICLE NOT FOUND');

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET - Récupérer l'avis d'un article
router.get('/get-article-avis/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const article = await ModelArticle.findById(id).populate('avis', 'comment');

        if(!article) return res.status(404).json('ARTICLE NOT FOUND');

        res.status(200).json(article.avis);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// GET - Trier les articles par prix
router.get('/filter-articles-by-price', async (req, res) => {
    try {
        const articlesByPrice = await ModelArticle.find().sort({ price: 1 });

        if(!articlesByPrice) return res.status(404).json('NO ARTICLES FOUND');

        res.status(200).json(articlesByPrice);
    } catch (error) {
        res.status(500).json(error.message)
    }
});

// GET - Trier les articles par note
router.get('/filter-articles-by-rating', async (req, res) => {
    try {
        const articlesByRating = await ModelArticle.find().populate('avis', 'rating');

        articlesByRating.sort((a, b) => {
            // Condition permettant de vérifier si un avis existe, si oui, est-ce qu'il existe un rating, si oui, le prendre, sinon affecter -infinity, pour l'avoir en fin de classement
            const ra = a.avis?.rating ?? -Infinity;  
            const rb = b.avis?.rating ?? -Infinity;
            return rb - ra;
        });

        res.status(200).json(articlesByRating);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// POST - Ajouter un article
router.post('/add', async (req, res) => {
    try {
        const article = await ModelArticle.create(req.body);
        res.status(201).json(article);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// UPDATE - Mettre à jour les informations d'un article
router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params

        const modifiedUser = await ModelArticle.findByIdAndUpdate(id, req.body, { new: true });

        if(!modifiedUser) return res.status(404).json('ARTICLE NOT FOUND');

        res.status(200).json(modifiedUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

// DELETE - Supprimer un article
router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await ModelArticle.findByIdAndDelete(id);

        if(!deletedUser) return res.status(404).json('ARTICLE NOT FOUND');

        res.status(200).json('Article deleted !');
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;