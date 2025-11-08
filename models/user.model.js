'use strict';

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        prenom: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: function () {
                return `https://i.pravatar.cc/150?u=${this.email}`;
            }
        },
        email: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user"
        }
    }, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);