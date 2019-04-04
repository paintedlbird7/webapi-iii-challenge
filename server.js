const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const morgan = require('morgan')

const postsRouter = require('./data/posts/posts-router');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));


server.use(teamNamer);
// server.use(moodyGateKeeper);

// request handler that responds with a custom message for invalid URLs.
// if a client visits a non-existing endpoint, they will get a default message provided by their client 
//when a resource is not found on a server
// server.use((req, res) => {
//   res.status(500).send("Ain't nobody got time for that!")
// })



server.use('/api/posts/', restricted, 
// only('Frodo'), 
postsRouter);

server.get('/',  (req, res, next) => {
  res.send(`
    <h2>Lambda Node Blog API</h2>
    <p>Welcome ${req.team} to the API using a Node.js and Express</p>

    `);
});

// server.use(errorHandler);

function teamNamer(req, res, next) {
  req.team = 'WEB17'

// If we don't call next the request will hanf and time out. 
  next() // Calling next continues to the next middleware/route handler
}


function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json({ you: 'shall not pass!' })
  } else {
    next()
  }
}


function restricted(req, res, next) {
  const password = req.headers.authorization;

  if (req.headers && req.headers.authorization) {
    if (password === 'taco') {
      next();
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    next({ message: 'No authorization header provided' });
  }
}



function only(name) {
    //returns the middleware
    return function(req, res, next) {
      const personName = req.headers.name || ''; // just in case there is no name header provided
  
      // This function can use the parameter passed to the wrapper function
  
      if (personName.toUpperCase()=== name.toUpperCase()) {
        next()
      } else {
        res.status(401).json({ message: 'You have no access to this resource' })
      }
    }
  }
  
  
  
  function errorHandler(error, req, res, next) {
    // here you could inspect the errror and decide how to respond
  
    res.status(400).json({ message: 'NO NO NO NO!!!!!!!', error })
  }
  
  


module.exports = server;
