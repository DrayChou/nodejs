
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer();

app.use(express.logger('dev'));
app.use(app.router);

// the error handler is strategically
// placed *below* the app.router; if it
// were above it would not receive errors
// from app.get() etc 
app.use(error);

// error handling middleware have an arity of 4
// instead of the typical (req, res, next),
// otherwise they behave exactly like regular
// middleware, you may have several of them,
// in different orders etc.

function error(err, req, res, next) {
  // log it
  console.error(err.stack);

  // respond with 500 "Internal Server Error".
  res.send(500);
}

app.get('/', function(req, res){
  // Caught and passed down to the errorHandler middleware
  throw new Error('something broke!');
});

app.get('/next', function(req, res, next){
  // We can also pass exceptions to next()
  process.nextTick(function(){
    next(new Error('oh no!'));
  });
});

app.listen(3000);
console.log('app listening on port 3000');