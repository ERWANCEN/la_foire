'use strict';

const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();

// MIDDLEWARES
app.use(express.json());

// ROUTER
const userRouter = require('./router/user.router');
const articleRouter = require('./router/article.router');
const avisRouter = require('./router/avis.router');

// MONGO
mongoose
    .connect(process.env.MONGO_URI, { dbName: process.env.DB_NAME })
    .then(() => console.log('Connexion à mongo réussi'))
    .catch(error => console.log(error))

// PREFIX
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);
app.use("/api/avis", avisRouter);

// PORT
const PORT = process.env.PORT || 8080;

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})