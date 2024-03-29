
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer();


// add favicon() before logger() so
// GET /favicon.ico requests are not
// logged, because this middleware
// reponds to /favicon.ico and does not
// call next()
app.use(express.favicon());

// custom log format
app.use(express.logger(':method :url'));

// parses request cookies, populating
// req.cookies and req.signedCookies
// when the secret is passed, used 
// for signing the cookies.
app.use(express.cookieParser('my secret here'));

// parses json, x-www-form-urlencoded, and multipart/form-data
app.use(express.bodyParser());

app.get('/', function(req, res){
  if (req.cookies.remember) {
    res.send('Remembered :). Click to <a href="/forget">forget</a>!.');
  } else {
    res.send('<form method="post"><p>Check to <label>'
      + '<input type="checkbox" name="remember"/> remember me</label> '
      + '<input type="submit" value="Submit"/>.</p></form>');
  }
});

app.get('/forget', function(req, res){
  res.clearCookie('remember');
  res.redirect('back');
});

app.post('/', function(req, res){
  var minute = 60000;
  if (req.body.remember) res.cookie('remember', 1, { maxAge: minute });
  res.redirect('back');
});

app.listen(3000);
console.log('Express started on port 3000');