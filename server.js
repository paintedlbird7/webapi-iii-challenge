const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const morgan = require('morgan')

const postsRouter = require('./data/posts/posts-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));




module.exports = server;
