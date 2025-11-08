'use strict';

const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true 
        },
        brand: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        avis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Avis"
        },
        img: {
            type: String,
            required: true
        },
        img1: {
            type: String,
            required: true
        },
        img2: {
            type: String,
            required: true
        },
        img3: {
            type: String
        },
        img4: {
            type: String
        },
        status: {
            type: Boolean,
            default: true
        },
        stock: {
            type: Number,
            required: true,
            min: 0
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('Article', articleSchema);