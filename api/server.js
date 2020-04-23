const express = require('express');
const animeRouter = require('../anime/anime-router.js');

const server = express();

server.use(express.json());
server.use('/api/anime', animeRouter);

module.exports = server;