const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const morgan = require('morgan')

const postsRouter = require('./data/posts/posts-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


// server.use(teamNamer);
// server.use(moodyGateKeeper);

// request handler that responds with a custom message for invalid URLs.
// if a client visits a non-existing endpoint, they will get a default message provided by their client 
//when a resource is not found on a server
server.use((req, res) => {
  res.status(500).send("Ain't nobody got time for that!")
})


module.exports = server;
